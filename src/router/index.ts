import { createRouter, createWebHistory } from 'vue-router'
import MessagePage from '@/views/MessagePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/messages',
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagePage,
    },
  ],
})

export default router
