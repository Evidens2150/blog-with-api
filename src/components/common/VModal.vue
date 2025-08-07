<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="modal">
        <div class="modal__content">
          <v-button class="close-button" @click="emit('cancel')">&times;</v-button>
          <slot></slot>
          <div class="bottom-actions">
            <v-button
              :title="saveButtonTitle"
              :disabled="saveButtonDisabled"
              @click="emit('save')"
            >
              Сохранить
            </v-button>
            <v-button @click="emit('cancel')">
              Отменить
            </v-button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang='ts'>
// Modules
import { toRefs, withDefaults, defineProps, defineEmits } from 'vue';
// Components
import VButton from '@/components/common/VButton.vue';
// Types
import { IModalProps } from '@/types';

// Props
const props = withDefaults(defineProps<IModalProps>(), {
  saveButtonDisabled: false,
  saveButtonTitle: '',
});

const {
  saveButtonDisabled,
  saveButtonTitle,
} = toRefs(props);

// Model
const modelValue = defineModel<boolean>();

// Emits
const emit = defineEmits<{
  (e: 'save' | 'cancel'): void
}>();
</script>

<style lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal__content {
  position: relative;
  background-color: #222;
  color: #fff;
  padding: 32px;
  border-radius: 8px;
  max-width: 500px;
  width: calc(100% - 40px);
  box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.3);
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
}

</style>