<template>
  <router-link :to="{ path: `/post/${id}` }" class="post">
    <h3>
      {{ title }}
    </h3>
    <h4 class="post__author">
      <router-link
        :to="{ path: `/user/${userId}` }"
        @click.stop
      >
        {{ author }}
      </router-link>
    </h4>
    <p>
      {{ briefDescription }}
    </p>
    <div class="post__bottom">
      <span>
        Комментариев: {{ commentCount }}
      </span>
      <span>
        {{ dateTime }}
      </span>
    </div>
  </router-link>
</template>

<script setup lang='ts'>
// Modules
import { toRefs, defineProps } from 'vue';
// Types
import { IPostCardProps } from '@/types';

// Props
const props = defineProps<IPostCardProps>();

const {
  id,
  title,
  author,
  briefDescription,
  dateTime,
  commentCount,
  userId,
} = toRefs(props);
</script>

<style lang='scss'>
.post {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-decoration: unset;
  font-weight: 400;

  &:hover {
    color: rgba(255, 255, 255, 0.87);
    border-color: #646cff;
  }

  &__author {
    opacity: .6;
  }

  &__bottom {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    opacity: .6;
  }
}
</style>