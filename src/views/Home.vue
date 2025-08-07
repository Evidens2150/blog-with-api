<template>
  <div class="conatiner page-content">
    <h1 class="page-title">Все публикации</h1>
    <div class="top-actions">
      <v-button @click="openNewUserModal">
        Новый автор
      </v-button>
      <new-post-creator/>
    </div>
    <ul class="card-list">
      <li
        v-if="!currentPostList.length"
        class="card-list__empty"
      >
        <p>
          Публикаций пока нет, создайте первую.
        </p>
      </li>
      <li
        v-for="post in currentPostList"
        :key="post.id"
      >
        <post-card
          v-bind="post"
        />
      </li>
    </ul>
    <v-modal 
      v-model="showModal"
      :saveButtonTitle="saveButtonTitle"
      :saveButtonDisabled="isSaveButtonDisabled"
      @save="handleSaveModalData"
      @cancel="handleCloseModal"
    >
      <v-input
        v-model="newUserData.fullName"
        title="Имя автора"
      />
      <v-input
        v-model="newUserData.blogName"
        title="Название блога"
      />
    </v-modal>
  </div>
</template>

<script setup lang="ts">
// Modules
import { ref, computed, reactive } from 'vue';
// Components
import VButton from '@/components/common/VButton.vue';
import VModal from '@/components/common/VModal.vue';
import VInput from '@/components/common/VInput.vue';
import NewPostCreator from '@/components/NewPostCreator.vue';
import PostCard from '@/components/PostCard.vue';
// Store
import { useCommonStore } from '@/store';
// Types
import { IPostCardProps, IUserCreatePayload, } from '@/types';

// Data
const commonStore = useCommonStore();
const showModal = ref<boolean>(false);
const newUserData = reactive<IUserCreatePayload>({
  fullName: '',
  blogName: '',
});

// Computed
const currentPostList = computed((): IPostCardProps[] => commonStore.postList);

const isSaveButtonDisabled = computed((): boolean =>
  Object.values(newUserData).some(fieldValue => !fieldValue)
);

const saveButtonTitle = computed((): string =>
  isSaveButtonDisabled.value ? 'Заполните все поля' : ''
);

// Methods
const openNewUserModal = () => {
  showModal.value = true;
};

const handleSaveModalData = async() => {
  commonStore.setLoadingState(true);
  try {
    await commonStore.createUser(newUserData);

    await commonStore.getUserInfoList();

    handleCloseModal();
  } catch (error) {
    console.error(error);
  } finally {
    commonStore.setLoadingState(false);
  }
};

const handleCloseModal = () => {
  showModal.value = false;

  Object.keys(newUserData).forEach(key => {
    newUserData[key as keyof typeof newUserData] = '';
  });
};
</script>

<style lang="scss">
</style>