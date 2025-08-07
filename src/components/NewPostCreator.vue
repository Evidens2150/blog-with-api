<template>  
  <v-button
    :title="newPostButtonTitle"
    :disabled="isEmptyUserOptionList"
    @click="openNewPostModal"
  >
    Новая публикация
  </v-button>

  <v-modal 
    v-model="showModal"
    :saveButtonTitle="saveButtonTitle"
    :saveButtonDisabled="isErrors"
    @save="handleCreatePost"
    @cancel="handleCloseModal"
  >
    <v-select
      v-if="!authorId"
      v-model="author"
      :options="userOptionList"
      :errors="authorErrors"
      title="Имя автора"
      @change="removeFieldErrors('author')"
    />
    <v-input
      v-model="newPostData.title"
      title="Заголовок публикации"
      :errors="titleErrors"
      :maxlength="titleMaxlength + 1"
      @input="removeFieldErrors('title')"
    />
    <v-input
      v-model="newPostData.briefDescription"
      title="Краткое описание"
      :errors="briefDescriptionErrors"
      :maxlength="briefDescriptionMaxlength + 1"
      @input="removeFieldErrors('briefDescription')"
    />
    <v-textarea
      v-model="newPostData.fullDescription"
      title="Текст публикации"
      :errors="fullDescriptionErrors"
      :maxlength="fullDescriptionMaxlength + 1"
      @input="removeFieldErrors('fullDescription')"
    />
  </v-modal>
</template>

<script setup lang='ts'>
// Modules
import { ref, computed, reactive, toRefs, defineProps } from 'vue';
// Components
import VSelect from '@/components/common/VSelect.vue';
import VButton from '@/components/common/VButton.vue';
import VModal from '@/components/common/VModal.vue';
import VInput from '@/components/common/VInput.vue';
import VTextarea from '@/components/common/VTextarea.vue';
// Store
import { useCommonStore } from '@/store';
// Types
// Types
import { IPostCreatePayload, IUser, ISelectOption, PostFieldKeyList, INewPostModalProps } from '@/types';

// Props
const props = withDefaults(defineProps<INewPostModalProps>(), {
  authorId: 0,
  titleMaxlength: 50,
  briefDescriptionMaxlength: 100,
  fullDescriptionMaxlength: 255,
});

const {
  authorId,
  titleMaxlength,
  briefDescriptionMaxlength,
  fullDescriptionMaxlength,
} = toRefs(props);

// Emits
const emit = defineEmits<{
  (e: 'removeFieldErrors', value: PostFieldKeyList): void
}>();

// Data
const author = ref<number>(0);
const newPostData = reactive<IPostCreatePayload>({
  briefDescription: '',
  fullDescription: '',
  title: '',
});
const commonStore = useCommonStore();
const showModal = ref<boolean>(false);
const errorMap = ref<Record<PostFieldKeyList, string[]>>({
  author: [],
  title: [],
  briefDescription: [],
  fullDescription: [],
});

// Computed
const currentAuthor = computed((): number =>
  authorId.value || author.value || 0
);

const isErrors = computed((): boolean =>
  Object.values(errorMap.value).some(errors => !!errors?.length)
);

const fullUserInfoList = computed((): IUser[] => commonStore.userInfoList);

const userOptionList = computed((): ISelectOption[] =>
  fullUserInfoList.value.map(user => ({
    label: user.fullName,
    value: user.id,
  }))
  .filter(user => !!user.label)
  .sort((userA, userB) => {
    return userA.value - userB.value
  })
);

const isEmptyUserOptionList = computed((): boolean => 
  !userOptionList.value.length
);

const newPostButtonTitle = computed((): string =>
  isEmptyUserOptionList.value ? 'Необходимо создать автора' : ''
);

const saveButtonTitle = computed((): string =>
  isErrors.value ? 'Некорректно заполнены поля' : ''
);

const authorErrors = computed((): string[] =>
  errorMap.value['author'] || []
);

const titleErrors = computed((): string[] =>
  errorMap.value['title'] || []
);

const briefDescriptionErrors = computed((): string[] =>
  errorMap.value['briefDescription'] || []
);

const fullDescriptionErrors = computed((): string[] =>
  errorMap.value['fullDescription'] || []
);

// Methods
const handleCreatePost = async() => {
  validate();

  if (isErrors.value) return;

  commonStore.setLoadingState(true);
  try {
    await commonStore.createPost(newPostData, currentAuthor.value);

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

  Object.keys(newPostData).forEach(key => {
    newPostData[key as keyof typeof newPostData] = '';
  });

  Object.keys(errorMap.value).forEach(key => {
    removeFieldErrors(key as PostFieldKeyList);
  });

  author.value = 0;
};

const validate = () => {
  if (!currentAuthor.value) {
    errorMap.value.author = ['Необходимо выбрать автора'];
  }

  const titleErrors: string[] = [];
  if (!newPostData.title || newPostData.title.trim() === '') {
    titleErrors.push('Обязательно для заполнения');
  }
  if (newPostData.title.length > titleMaxlength.value) {
    titleErrors.push(`Не должно превышать ${titleMaxlength.value} символов`);
  }
  errorMap.value.title = titleErrors;

  const briefDescriptionErrors: string[] = [];
  if (!newPostData.briefDescription || newPostData.briefDescription.trim() === '') {
    briefDescriptionErrors.push('Обязательно для заполнения');
  }
  if (newPostData.briefDescription.length > briefDescriptionMaxlength.value) {
    briefDescriptionErrors.push(`Не должно превышать ${briefDescriptionMaxlength.value} символов`);
  }
  errorMap.value.briefDescription = briefDescriptionErrors;

  const fullDescriptionErrors: string[] = [];
  if (!newPostData.fullDescription || newPostData.fullDescription.trim() === '') {
    fullDescriptionErrors.push('Обязателен для заполнения');
  }
  if (newPostData.fullDescription.length > fullDescriptionMaxlength.value) {
    fullDescriptionErrors.push(`Не должен превышать ${fullDescriptionMaxlength.value} символов`);
  }
  errorMap.value.fullDescription = fullDescriptionErrors;
};

const removeFieldErrors = (fieldKey: PostFieldKeyList) => {
  errorMap.value[fieldKey] = []
};

const openNewPostModal = () => {
  showModal.value = true;
};
</script>