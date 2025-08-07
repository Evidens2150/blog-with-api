export interface ICommentCreatePayload {
  email: string;
  textComment: string;
  userInfo: string;
}

export interface IComment extends ICommentCreatePayload {
  dateTime: Date;
  id: number;
}

export interface IPostCreatePayload {
  briefDescription: string;
  fullDescription: string;
  title: string;
}

export interface IPostEditPayload extends IPostCreatePayload {
  id: number;
}

export interface IPost extends IPostEditPayload {
  dateTime: Date;
  userInfoId: number;
  comments: IComment[];
}

export interface IPostCardProps {
  id: number;
  title: string;
  author: string;
  briefDescription: string;
  dateTime: Date;
  commentCount: number;
  userId: number;
}

export interface IUserCreatePayload {
  blogName: string;
  fullName: string;
}

export interface IUser extends IUserCreatePayload {
  id: number;
  post: IPost[];
}

export interface IDeleteResponce {
  body: object;
  statusCode: string;
  statusCodeValue: number;
}

export interface IButtonProps {
  disabled?: boolean;
  title?: string;
}

export interface IInputProps {
  title?: string;
  placeholder?: string;
  errors?: string[];
  maxlength?: number;
}

export interface ISelectOption {
  label: string;
  value: number;
}

export interface ISelectProps {
  title?: string;
  errors?: string[];
  options?: ISelectOption[];
}

export interface IModalProps {
  saveButtonDisabled?: boolean;
  saveButtonTitle?: string;
}

export interface IAccordeonProps {
  title: string;
}

export type CommentFieldKeyList = 'author' | 'email' | 'text';

export interface ICommentFieldsetProps {
  authorMaxlength?: number;
  emailMaxlength?: number;
  textMaxlength?: number;
}

export type PostFieldKeyList = 'author' | 'title' | 'briefDescription' | 'fullDescription';

export interface INewPostModalProps {
  authorId?: number;
  titleMaxlength?: number;
  briefDescriptionMaxlength?: number;
  fullDescriptionMaxlength?: number;
}
