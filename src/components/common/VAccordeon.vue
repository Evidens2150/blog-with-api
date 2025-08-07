<template>
  <div
    class="accordion"
    :class="[
        'accordion',
        {'accordion--open': isOpen}
      ]"
  >
    <v-button class="accordion__header-button" @click="toggleOpen">
      <span>{{ title }}</span>
      <span class="accordion__icon">&times;</span>
    </v-button>
    <div class="accordion__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
// Modules
import { ref, toRefs, defineProps } from 'vue';
// Components
import VButton from '@/components/common/VButton.vue';
// Types
import { IAccordeonProps } from '@/types';

// Props
const props = defineProps<IAccordeonProps>();

const {
  title,
} = toRefs(props);

// Data
const isOpen = ref<boolean>(false);

// Methods
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
}
</script>

<style lang='scss'>
.accordion {
  padding: 15px 8.5px 6px 0;
}

.accordion__header-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.accordion__body {
  padding: 0 5px;
  max-height: 0;
  color: inherit;
  overflow: hidden;
  transition: all .2s linear;
}

.accordion__icon {
  transform: rotate(45deg);
  transition: all .2s linear;
}

.accordion--open {
  .accordion__body {
    max-height: 500px;
    padding: 16px;
    border-bottom: 1px solid #646cff;
    border-radius: 8px;
  }

  .accordion__icon {
    transform: rotate(0deg);
  }
}
</style>