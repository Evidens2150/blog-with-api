import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import UserBlog from '@/views/UserBlog.vue'
import PostDetail from '@/views/PostDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/user/:userId', component: UserBlog },
  { path: '/post/:postId', component: PostDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;