<template>
  <div>
    <!-- 其他组件和内容 -->
    <MusicPlayer />
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue';
import VAudioPlayer from "@woodydark/vuetify-audio-player";

export default {
  components: {
    MusicPlayer,
    VAudioPlayer,
  },
};
</script>
