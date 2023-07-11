import { createRouter, createWebHistory } from 'vue-router'
import explore from '../views/Explore/ExploreView.vue'
import library from '../views/Library/LibraryView.vue'
import player from '../views/Audio/vuetify-audio.vue'
import login from '../views/Login/login.vue'
import HomePage from '../views/home/HomePage.vue';
import InfoPage from "@/views/info/info.vue";
import albums from "@/views/Explore/Albums.vue";


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/',
    name: '/',
    component: HomePage
  },
  {
    path: '/info',
    name: 'info',
    component:InfoPage
  },
  {
    path: '/explore',
    name: 'explore',
    component: explore
  },
  {
    path: '/album/:albumId',
    name: 'album',
    component: albums,
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
