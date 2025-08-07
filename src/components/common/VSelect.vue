<template>
  <div class="select__wrapper">
    <span
      v-if="title"
    >
      {{ title }}
    </span>
    <div class="select">
      <v-button
        :class="[
          'select__button',
          {'select__button--error': isErrors}
        ]"
        @click="toggleOptionList"
        @mouseenter="toggleShowErrorList(true)"
        @mouseleave="toggleShowErrorList(false)"
      >
        <span>
          {{ selectedOptionLabel }}
        </span>
        <span
          :class="[
            'select__arrow',
            {'select__arrow--rotate': showOptions}
          ]"
        >
          ▼
        </span>
      </v-button>
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
      <ul
        :class="[
          'select__option-list',
          {'select__option-list--open': showOptions}
        ]"
      >
        <li
          v-for="option in options"
          :key="option.value"
        >
          <v-button
            :class="[
              'select__option',
              {'select__option--selected': checkOptionSelected(option.value)}
            ]"
            @click="handleSelectOption(option.value)"
          >
            {{ option.label }}
          </v-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
// Modules
import { ref, computed, toRefs, withDefaults, defineProps, defineModel, defineEmits } from 'vue';
// Components
import VButton from '@/components/common/VButton.vue';
// Types
import {
  ISelectProps,
  ISelectOption,
} from '@/types';

// Props
const props = withDefaults(defineProps<ISelectProps>(), {
  title: '',
  errors: () => ([]),
  options: () => ([]),
});

const {
  title,
  errors,
  options,
} = toRefs(props);

// Emit
const emit = defineEmits<{
  (e: 'change'): void;
  (e: 'update:modelValue', value: number): void;
}>();

// Model
const modelValue = defineModel<number>();

// Data
const showOptions = ref<boolean>(false);
const showErrorList = ref<boolean>(false);

// Computed
const isErrors = computed((): boolean => !!errors.value.length);

const selectedOption = computed((): ISelectOption | null =>
  options.value.find(option => option.value === modelValue.value) || null
);

const selectedOptionLabel = computed((): string => {
  return selectedOption.value?.label || '';
});

// Methods
const toggleShowErrorList = (value: boolean) => {
  if (!isErrors.value || showOptions.value) {
    showErrorList.value = false;
    return;
  }
  showErrorList.value = value;
};

const toggleOptionList = () => {
  showOptions.value = !showOptions.value;
};

const handleSelectOption = (value: number) => {
  toggleOptionList();

  if (checkOptionSelected(value)) return;

  emit('update:modelValue', value);
  emit('change');
};

const checkOptionSelected = (value: number) => (
  selectedOption.value?.value === value
);
</script>

<style lang='scss'>
.select {
  width: 100%;

  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    margin-bottom: 8px;
  }

  &__button {
    width: 100%;
    justify-content: space-between;

    &--error {
      border-color: red;
    }
  }

  &__option-list {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 3;
    width: 100%;
    max-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
    background-color: #242424;
    border-radius: 8px;
    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.3);

    &--open {
      overflow-y: auto;
      max-height: 500px;
      padding: 8px;
    }
  }

  &__option {
    justify-content: center;
    width: 100%;
    padding: 4px;

    &:hover {
      color: #646cff;
      opacity: .8;
    }

    &--selected {
      opacity: .6;
      text-decoration: underline;
    }
  }

  &__arrow {
    transition: transform 0.2s ease;

    &--rotate {
      transform: rotate(180deg);
    }
  }
}
</style>