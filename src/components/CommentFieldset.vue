<template>
  <div class="fieldset">
    <v-input
      v-model="author"
      title="Ваше имя"
      :errors="authorErrors"
      :maxlength="authorMaxlength + 1"
      class="fieldset__input"
      @input="removeFieldErrors('author')"
    />
    <v-input
      v-model="email"
      title="Email"
      :errors="emailErrors"
      :maxlength="emailMaxlength + 1"
      class="fieldset__input"
      @input="removeFieldErrors('email')"
    />
    <v-textarea
      v-model="text"
      title="Комментарий"
      :errors="textErrors"
      :maxlength="textMaxlength + 1"
      @input="removeFieldErrors('text')"
    />
    <v-button
      :disabled="isErrors"
      :title="newPostButtonTitle"
      class="fieldset__button"
      @click="handleSendComment"
    >
      Отправить
    </v-button>
  </div>
</template>

<script setup lang='ts'>
// Modules
import { ref, computed, toRefs, defineEmits } from 'vue';
// Components
import VInput from '@/components/common/VInput.vue';
import VTextarea from '@/components/common/VTextarea.vue';
import VButton from '@/components/common/VButton.vue';
// Types
import { CommentFieldKeyList, ICommentFieldsetProps } from '@/types';

// Props
const props = withDefaults(defineProps<ICommentFieldsetProps>(), {
  authorMaxlength: 5,
  emailMaxlength: 50,
  textMaxlength: 255,
});

const {
  authorMaxlength,
  emailMaxlength,
  textMaxlength,
} = toRefs(props);

// Emits
const emit = defineEmits<{
  (e: 'sendComment'): void
}>();

// Models
const author = defineModel<string>('author');
const email = defineModel<string>('email');
const text = defineModel<string>('text');

// Data
const errorMap = ref<Record<CommentFieldKeyList, string[]>>({
  author: [],
  email: [],
  text: [],
});

// Computed
const authorErrors = computed((): string[] =>
  errorMap.value['author'] || []
);

const emailErrors = computed((): string[] =>
  errorMap.value['email'] || []
);

const textErrors = computed((): string[] =>
  errorMap.value['text'] || []
);

const isErrors = computed((): boolean =>
  Object.values(errorMap.value).some(errors => !!errors?.length)
);

const newPostButtonTitle = computed((): string => {
  if (isErrors.value) {
    return 'Некорректно заполнены поля';
  }

  return '';
});

// Methods
const handleSendComment = () => {
  validate();

  if (isErrors.value) return;

  emit('sendComment')
};

const removeFieldErrors = (fieldKey: CommentFieldKeyList) => {
  errorMap.value[fieldKey] = []
};

const validate = () => {
  const authorErrors: string[] = [];
  if (!author.value || author.value.trim() === '') {
    authorErrors.push('Имя обязательно для заполнения');
  }
  if (author.value && author.value.length > authorMaxlength.value) {
    authorErrors.push(`Имя не должно превышать ${authorMaxlength.value} символов`);
  }
  if (authorErrors.length > 0) {
    errorMap.value.author = authorErrors;
  }

  const emailErrors: string[] = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || email.value.trim() === '') {
    emailErrors.push('Email обязателен для заполнения');
  }
  if (email.value && email.value.length > emailMaxlength.value) {
    emailErrors.push(`Email не должен превышать ${emailMaxlength.value} символов`);
  }
  if (email.value && !emailPattern.test(email.value)) {
    emailErrors.push('Некорректный формат email');
  }
  if (emailErrors.length > 0) {
    errorMap.value['email'] = emailErrors;
  }

  const textErrors: string[] = [];
  if (!text.value || text.value.trim() === '') {
    textErrors.push('Комментарий обязателен для заполнения');
  }
  if (text.value && text.value.length > textMaxlength.value) {
    textErrors.push(`Комментарий не должен превышать ${textMaxlength.value} символов`);
  }
  if (textErrors.length > 0) {
    errorMap.value['text'] = textErrors;
  }
};
</script>

<style lang='scss'>
.fieldset {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: auto;

  &__input {
    max-width: calc(50% - 8px);
  }

  &__button {
    margin-left: auto;
  }
}

@media (max-width: 767px) {
  .fieldset__input {
    max-width: 100%;
  }
}
</style>