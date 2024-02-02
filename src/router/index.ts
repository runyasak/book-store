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
      path: '/books/:id',
      name: 'book-detail',
      component: () => import('@/views/BookDetailView.vue')
    },
    {
      path: '/book/create',
      name: 'book-create',
      component: () => import('@/views/BookCreateEditView.vue')
    },
    {
      path: '/book/update/:id',
      name: 'book-update',
      component: () => import('@/views/BookCreateEditView.vue')
    }
  ]
})

export default router
