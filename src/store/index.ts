// Modules
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// Api
import {
  login as ApiLogin,
  getUserInfoList as ApiGetUserInfoList,
  createPost as ApiCreatePost,
  getPost as ApiGetPost,
  createUser as ApiCreateUser,
  createComment as ApiCreateComment,
} from '@/api';
// Types
import {
  ICommentCreatePayload,
  IPostCreatePayload,
  IUserCreatePayload,
  IUser,
  IPostCardProps,
} from '@/types';
// Utils
import { formatPostList } from '@/utils';

export const useCommonStore = defineStore('commonStore', () => {
  // State
  const userInfoList = ref<IUser[]>([]);
  const isLoading = ref<boolean>(false);

  // Actions
  const login = async() => {
    try {
      await ApiLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfoList = async() => {
    try {
      userInfoList.value = await ApiGetUserInfoList();
    } catch (error) {
      userInfoList.value = [];
      throw error;
    }
  };

  const createPost = async(payload: IPostCreatePayload, userInfoId: number) => {
    try {
      await ApiCreatePost(payload, userInfoId);
    } catch (error) {
      throw error;
    }
  };

  const getPost = async(id: number) => {
    try {
      return await ApiGetPost(id);
    } catch (error) {
      throw error;
    }
  };

  const createUser = async(payload: IUserCreatePayload) => {
    try {
      await ApiCreateUser(payload);
    } catch (error) {
      throw error;
    }
  };

  const createComment = async(payload: ICommentCreatePayload, postId: number) => {
    try {
      await ApiCreateComment(payload, postId);
    } catch (error) {
      throw error;
    }
  };

  const setLoadingState = (value: boolean) => {
    isLoading.value = value;
  };

  // Getters
  const postList = computed((): IPostCardProps[] => (
    userInfoList.value.map(user => formatPostList(user))
    .flat()
    .sort((postA, postB) => {
      return postB.id - postA.id
    })
  ));

  return {
    // State
    userInfoList,
    isLoading,

    // Actions
    login,
    getUserInfoList,
    createPost,
    getPost,
    createUser,
    createComment,
    setLoadingState,

    // Getters
    postList,
  };
});