<template>
  <div class="input__wrapper">
    <span
      v-if="title"
    >
      {{ title }}
    </span>
    <input
      v-model="modelValue"
      type="text"
      :placeholder="placeholder"
      class="input"
      :class="{'input--error': isErrors}"
      :maxlength="maxlength"
      @input="emit('input')"
      @mouseenter="toggleShowErrorList(true)"
      @mouseleave="toggleShowErrorList(false)"
    />
    <ul
      v-show="showErrorList"
      class="error-list"
    >
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Modules
import { ref, computed, toRefs, withDefaults, defineProps, defineModel, } from 'vue';
// Types
import { IInputProps } from '@/types';

// Props
const props = withDefaults(defineProps<IInputProps>(), {
  title: '',
  placeholder: '',
  errors: () => ([]),
  maxlength: 50,
});

const {
  title,
  placeholder,
  errors,
  maxlength,
} = toRefs(props);

// Emit
const emit = defineEmits<{
  (e: 'input'): void
}>();

// Model
const modelValue = defineModel<string>();

// Data
const showErrorList = ref<boolean>(false);

// Computed
const isErrors = computed((): boolean => !!errors.value.length);

// Methods
const toggleShowErrorList = (value: boolean) => {
  if (!isErrors.value) {
    showErrorList.value = false;
    return;
  }
  showErrorList.value = value;
};
</script>

<style lang='scss'>

.input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #646cff;

  &--error {
    border-color: red;
  }
}
</style>