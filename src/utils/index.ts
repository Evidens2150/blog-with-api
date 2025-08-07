
// Types
import { IUser } from '@/types';

export const formatPostList = (user: IUser) => (
  user.post.map(post => ({
    id: post.id,
    title: post.title,
    author: user.fullName,
    briefDescription: post.briefDescription,
    dateTime: post.dateTime,
    commentCount: post.comments.length,
    userId: user.id,
  }))
  .sort((postA, postB) => {
    return postB.id - postA.id
  })
);