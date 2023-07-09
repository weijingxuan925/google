import { createRouter, createWebHistory } from 'vue-router'
import explore from '../views/Explore/ExploreView.vue'
import library from '../views/Library/LibraryView.vue'
import player from '../views/Audio/vuetify-audio.vue'
import login from '../views/Login/UserLoginView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: explore
  },
  {
    path: '/explore',
    name: 'explore',
    component: explore
  },
  {
    path: '/library',
    name: 'library',
    component: library
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: player
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
