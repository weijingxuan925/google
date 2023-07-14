import { createRouter, createWebHistory } from 'vue-router'
import explore from '../views/ExploreView.vue'
import playlist from '../views/PlaylistView.vue'
import player from '../views/vuetify-audio.vue'
import login from '../views/UserLoginView.vue'
import register from '../views/UserRegisterView.vue'
import library from '../views/LibraryView.vue'
import personalList from '../views/PersonalPlaylistView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: login
  },
  {
    path: '/explore',
    name: 'explore',
    component: explore,
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/playlist/:album',
    name: 'playlist',
    component: playlist,
    props: true,
  },
  {
    path: '/player/:trackId',
    name: 'player',
    component: player,
    props: true,
  },
  {
    path: '/personalList/:playlistId',
    name: 'personalList',
    component: personalList,
    props: true
  },
  {
    path: '/library',
    name: 'library',
    component: library,
    //props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  
  let Auth = localStorage.getItem('token');

  if(to.name !== 'login' && to.name !== 'register' &&Auth == 'none')
  {
    next({name: 'login'})
  }
  else
  {
    next();
  }
  
})

export default router
