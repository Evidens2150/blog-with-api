import axios from 'axios';
import {
  ICommentCreatePayload,
  IComment,
  IPostCreatePayload,
  IPostEditPayload,
  IPost,
  IUserCreatePayload,
  IUser,
  IDeleteResponce,
} from '@/types'

const API_PATH_AUTH = '/FrontTestingService-auth';
const API_PATH_BACK = '/FrontTestingService-back';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const login = async (): Promise<void> => {
  try {
    await apiClient.post(`${API_PATH_AUTH}/login`, null, {
    params: {
      username: 'Borodin',
      password: 'Alexander'
    }
  });
  } catch (error) {
    throw `Ошибка авторизации: ${error}`;
  }
};

export const createComment = async(payload: ICommentCreatePayload, postId: number): Promise<IComment> => {
  try {
    const response = await apiClient.post(`${API_PATH_BACK}/comment`,
      payload,
      {
        params: {
          postId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw `Ошибка создания комментария: ${error}`;
  }
};

export const deleteComment = async(id: number): Promise<IDeleteResponce> => {
  try {
    const response = await apiClient.delete(`${API_PATH_BACK}/comment/${id}`);
    return response.data;
  } catch (error) {
    throw `Ошибка удаления комментария: ${error}`;
  }
};

export const createPost = async(payload: IPostCreatePayload, userInfoId: number): Promise<IPost> => {
  try {
    const response = await apiClient.post(`${API_PATH_BACK}/post`, 
      payload,
      {
        params: {
          userInfoId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw `Ошибка создания публикации: ${error}`;
  }
};

export const editPost = async(payload: IPostEditPayload): Promise<IPost> => {
  try {
    const response = await apiClient.put(`${API_PATH_BACK}/post`, 
      payload
    );
    return response.data;
  } catch (error) {
    throw `Ошибка редактирования публикации: ${error}`;
  }
};

export const getPost = async(id: number): Promise<IPost> => {
  try {
    const response = await apiClient.get(`${API_PATH_BACK}/post/${id}`);
    return response.data;
  } catch (error) {
    throw `Ошибка запроса публикации: ${error}`;
  }
};

export const deletePost = async(id: number): Promise<IDeleteResponce> => {
  try {
    const response = await apiClient.delete(`${API_PATH_BACK}/post/${id}`);
    return response.data;
  } catch (error) {
    throw `Ошибка удаления публикации: ${error}`;
  }
};

export const createUser = async(payload: IUserCreatePayload): Promise<IUser> => {
  try {
    const response = await apiClient.post(`${API_PATH_BACK}/userInfo`,
      payload
    );
    return response.data;
  } catch (error) {
    throw `Ошибка создания пользователя: ${error}`;
  }
};

export const deleteUser = async(id: number): Promise<IDeleteResponce> => {
  try {
    const response = await apiClient.delete(`${API_PATH_BACK}/userInfo/${id}`);
    return response.data;
  } catch (error) {
    throw `Ошибка удаления пользователя: ${error}`;
  }
};

export const getUserInfoList = async(): Promise<IUser[]> => {
  try {
    const response = await apiClient.get(`${API_PATH_BACK}/userInfo/findAll`);
    return response.data;
  } catch (error) {
    throw `Ошибка запроса данных о пользователях: ${error}`;
  }
};