<template>
  <div class="comment">
    <h3>
      {{ userInfo }}
    </h3>
    <p>
      {{ textComment }}
    </p>
    <div class="comment__bottom">
      <span>
        {{ email }}
      </span>
      <span>
        {{ dateTime }}
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
// Modules
import { toRefs, defineProps } from 'vue';
// Types
import { IComment } from '@/types';

// Props
const props = defineProps<IComment>();

const {
  email,
  textComment,
  userInfo,
  dateTime,
} = toRefs(props);
</script>

<style lang='scss'>
.comment {
  width: max-content;
  max-width: 100%;
  min-width: 280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;

  &__bottom {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    opacity: .6;
  }
}
</style>