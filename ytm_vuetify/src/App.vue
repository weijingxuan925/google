<template>
  <v-app>
    <v-main>
      <NavigationBar />
      <div class="page-container">
        <router-view></router-view>
      </div>
    </v-main>

    <!-- 在这里放置主页的音频播放器组件 -->
    <div v-if="$route.name === 'explore' || $route.name === 'home' || $route.name === 'library'" class="audio-player-container">
      <vuetify-audio
          :file="'http://150.158.22.150/upload/music/ah.mp3'"
          :autoPlay="false"
          :color="'blue'"
          :downloadable="true"
      ></vuetify-audio>
    </div>
  </v-app>
</template>

<style>
.audio-player-container {
  /*position: fixed;*/
  /*left: 0;*/
  //right: 0;
  //bottom: 0;
  //z-index: 9999; /* 确保音频播放器位于其他内容之上 */
}


</style>

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
