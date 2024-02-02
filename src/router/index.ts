import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books/:bookId',
      name: 'books-detail',
      component: () => import('@/views/BookDetail.vue')
    },
    {
      path: '/create-book',
      name: 'create-book',
      component: () => import('@/views/BookCreate.vue')
    },
    {
      path: '/edit-book/:bookId',
      name: 'edit-book',
      component: () => import('@/views/BookEdit.vue')
    }
  ]
})

export default router
