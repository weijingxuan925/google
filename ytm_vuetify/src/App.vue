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
<!--      <vuetify-audio-->
<!--          src="http://www.example.com/your_music.ogg"-->
<!--          track-title="Your Music"-->
<!--          track-subtitle="Best of Electro Swing"-->
<!--          allow-previous-->
<!--          allow-next-->
<!--          :compact="$vuetify.breakpoint.smAndDown"-->
<!--          :autoplay="false"-->
<!--          album-art="https://www.example.com/my-beautiful-art.jpeg"-->
<!--          @next-audio="nextSrc()"-->
<!--          @previous-audio="prevSrc()"-->
<!--          prev-track-icon="mdi-skip-previous"-->
<!--          next-track-icon="mdi-skip-next"-->
<!--          back-forward-icon="mdi-rewind-5"-->
<!--          fast-forward-icon="fast-forward-5"-->
<!--          play-icon="mdi-play"-->
<!--          pause-icon="mdi-pause"-->
<!--          mute-volume-icon="mdi-volume-off"-->
<!--          low-volume-icon="mdi-volume-low"-->
<!--          medium-volume-icon="mdi-volume-medium"-->
<!--          high-volume-icon="mdi-volume-high"-->
<!--      ></vuetify-audio>-->

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
