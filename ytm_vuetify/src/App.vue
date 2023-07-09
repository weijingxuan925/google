<template>
  <v-app>
    <v-main>
      <NavigationBar />
      <router-view></router-view>
    </v-main>

    <!-- 在这里放置主页的音频播放器组件 -->
    <router-view v-if="$route.name === 'home'">
      <vuetify-audio
          :file="audioFile"
          :autoPlay="true"
          :color="'blue'"
          :downloadable="true"
      ></vuetify-audio>
    </router-view>
  </v-app>
</template>


<script>

import NavigationBar from './components/NavigationBar.vue';
import VuetifyAudio from "@/views/Audio/vuetify-audio.vue";

export default {
  name: 'App',

  components: {
    VuetifyAudio,
    NavigationBar,
  },

  data: () => ({
    //
  }),
}
</script>
