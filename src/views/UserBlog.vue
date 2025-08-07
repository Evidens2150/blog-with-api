<template>
  <div class="conatiner page-content">
    <h1 class="page-title">Блог пользователя</h1>
    <div class="top-actions">
      <router-link :to="{ path: '/' }">
        На главную
      </router-link>

      <new-post-creator
        :author-id="userId"
      />
    </div>

    <h2 class="page-content__title">
      {{ currentUserBlogName }}
    </h2>

    <h3 class="page-content__subtitle">
      {{ currentUserName }}
    </h3>

    <ul class="card-list">
      <li
        v-for="post in currentUserPostList"
        :key="post.id"
      >
        <post-card
          v-bind="post"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Modules
import { computed, } from 'vue';
import { useRoute } from "vue-router";
// Components
import PostCard from '@/components/PostCard.vue';
import NewPostCreator from '@/components/NewPostCreator.vue';
// Store
import { useCommonStore } from '@/store';
// Types
import { IPostCardProps, IUser, } from '@/types';
// Utils
import { formatPostList } from '@/utils';

// Data
const commonStore = useCommonStore();
const route = useRoute();

// Computed
const userId = computed((): number => +route.params.userId);

const currentUserInfo = computed((): IUser | null =>
  commonStore.userInfoList.find(user => user.id === userId.value) || null
);

const currentUserName = computed((): string =>
  currentUserInfo.value?.fullName || ''
);

const currentUserBlogName = computed((): string =>
  currentUserInfo.value?.blogName || ''
);

const currentUserPostList = computed((): IPostCardProps[] => {
  if (!currentUserInfo.value) return [];
  return formatPostList(currentUserInfo.value)
});
</script>

<style lang='scss'>
</style>
