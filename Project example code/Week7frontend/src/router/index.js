import { createRouter, createWebHistory } from 'vue-router'
import explore from '../views/ExploreView.vue'
import playlist from '../views/PlaylistView.vue'
import player from '../views/vuetify-audio.vue'
import login from '../views/UserLoginView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: login
  },
  {
    path: '/explore',
    name: 'explore',
    component: explore
  },
  {
    path: '/library',
    name: 'library',
    component: player
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/playlist/:album',
    name: 'playlist',
    component: playlist,
    props: true
  },
  {
    path: '/player/:trackId',
    name: 'player',
    component: player,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
