<template>
  <div>
    <v-audio-player
        src="http://www.example.com/your_music.ogg"
        track-title="Your Music"
        track-subtitle="Best of Electro Swing"
        allow-previous
        allow-next
        :compact="$vuetify.breakpoint.smAndDown"
        :autoplay="false"
        album-art="https://www.example.com/my-beautiful-art.jpeg"
        @next-audio="nextSrc"
        @previous-audio="prevSrc"
        prev-track-icon="mdi-skip-previous"
        next-track-icon="mdi-skip-next"
        back-forward-icon="mdi-rewind-5"
        fast-forward-icon="mdi-fast-forward-5"
        play-icon="mdi-play"
        pause-icon="mdi-pause"
        mute-volume-icon="mdi-volume-off"
        low-volume-icon="mdi-volume-low"
        medium-volume-icon="mdi-volume-medium"
        high-volume-icon="mdi-volume-high"
    ></v-audio-player>
  </div>
</template>

<script>
import VAudioPlayer from '@woodydark/vuetify-audio-player';

export default {
  components: {
    VAudioPlayer
  },
  setup() {

    const nextSrc = () => {
      // 处理点击“下一首歌曲”按钮后的逻辑
    };

    const prevSrc = () => {
      // 处理点击“上一首歌曲”按钮后的逻辑
    };

    return {
      nextSrc,
      prevSrc
    };
  }
};
</script>
