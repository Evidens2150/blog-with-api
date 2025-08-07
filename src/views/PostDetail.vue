<template>
  <div class="conatiner page-content">
    <div class="top-actions">
      <router-link :to="{ path: '/' }">
        На главную
      </router-link>
    </div>

    <h2
      v-if="currentPost?.title"
      class="page-content__title"
    >
      {{ currentPost.title }}
    </h2>

    <h3
      v-if="currentPost?.dateTime"
      class="page-content__subtitle"
    >
      {{ currentPost.dateTime }}
    </h3>

    <v-accordeon
      v-if="currentPost"
      :title="currentPost.briefDescription"
    >
      {{ currentPost.fullDescription }}
    </v-accordeon>

    <h4>
      Комментарии:
    </h4>

    <ul class="card-list">
      <li
        v-if="!currentPost?.comments?.length"
        class="card-list__empty"
      >
        <p>
          Комментариев пока нет, напишите первый.
        </p>
      </li>
      <template v-else>
        <li
          v-for="comment in currentPost.comments"
          :key="comment.id"
        >
          <comment-card
            v-bind="comment"
          />
        </li>
      </template>
    </ul>

    <comment-fieldset
      v-model:author="newCommentData.userInfo"
      v-model:email="newCommentData.email"
      v-model:text="newCommentData.textComment"
      @send-comment="handleSendComment"
    />
  </div>
</template>

<script setup lang="ts">
// Modules
import { ref, computed, reactive, } from 'vue';
import { useRoute, useRouter } from "vue-router";
// Components
import CommentFieldset from '@/components/CommentFieldset.vue';
import CommentCard from '@/components/CommentCard.vue';
import VAccordeon from '@/components/common/VAccordeon.vue';
// Store
import { useCommonStore } from '@/store';
// Types
import { IPost, ICommentCreatePayload, } from '@/types';

// Data
const commonStore = useCommonStore();
const route = useRoute();
const router = useRouter();
const currentPost = ref<IPost | null>(null);
const newCommentData = reactive<ICommentCreatePayload>({
  email: '',
  textComment: '',
  userInfo: '',
});

// Computed
const postId = computed((): number => +route.params.postId);

// Methods
const getCurrentPost = async() => {
  try {
    currentPost.value = await commonStore.getPost(postId.value)
  } catch (error) {
    currentPost.value = null;
    console.error(error);
    router.push({path: '/'});
  }
};

const handleSendComment = async() => {
  commonStore.setLoadingState(true);
  try {
    await commonStore.createComment(newCommentData, postId.value);

    await getCurrentPost();
    clearNewCommentData();
  } catch (error) {
    console.error(error);
  } finally {
    commonStore.setLoadingState(false);
  }
};

const clearNewCommentData = () => {
  Object.keys(newCommentData).forEach(key => {
    newCommentData[key as keyof typeof newCommentData] = '';
  });
};

const initPage = async() => {
  commonStore.setLoadingState(true);
  await getCurrentPost();
  commonStore.setLoadingState(false);
}

// Hooks
initPage();
</script>

<style lang='scss'>
.post-description {

  &--brief {
    font-style: italic;
  }
}
</style>
