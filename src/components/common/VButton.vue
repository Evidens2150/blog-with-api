<template>
  <button
    :disabled="disabled"
    :title="title"
    type="button"
    class="button"
    @click.prevent="handleClick"
  >
    <slot>
      Кнопка
    </slot>
  </button>
</template>

<script setup lang='ts'>
// Modules
import { toRefs, withDefaults, defineProps, defineEmits } from 'vue';
// Types
import { IButtonProps } from '@/types';

// Props
const props = withDefaults(defineProps<IButtonProps>(), {
  disabled: false,
  title: '',
});

const {
  disabled,
  title,
} = toRefs(props);

// Emit
const emit = defineEmits<{
  (e: 'click'): void
}>()

// Methods
const handleClick = () => {
  emit('click');
};
</script>

<style lang='scss'>

.button {
  display: flex;
  gap: 8px;
  padding: 8px;

  background-color: #1a1a1a;
  border-radius: 8px;
  border: 1px solid gray;

  transition: all 0.2s ease;

  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: .8;
    border-color: #646cff;
  }

  &:focus:not(:disabled)
  &:active:not(:disabled) {
    opacity: .5;
    transform: translateY(1px);
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>