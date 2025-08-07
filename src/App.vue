<template>
  <v-loader :loading="isLoading"/>
  <router-view></router-view>
</template>

<script setup lang="ts">
// Modules
import { computed } from 'vue';
// Components
import VLoader from '@/components/common/VLoader.vue';
// Store
import { useCommonStore } from '@/store';

// Data
const commonStore = useCommonStore();

// Computed
const isLoading = computed((): boolean => commonStore.isLoading);

// Methods
const initData = async() => {
  commonStore.setLoadingState(true);
  try {
    await commonStore.login();
    await commonStore.getUserInfoList();
  } catch (error) {
    console.error(error);
  } finally {
    commonStore.setLoadingState(false);
  }
};

// Hooks
initData();
</script>

<style scoped>
</style>
