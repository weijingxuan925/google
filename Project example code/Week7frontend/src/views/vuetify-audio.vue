<template>
    <v-app id="inspire">
        <v-main class="bg-grey-darken-3">
          <v-card class="bg-grey-lighten-3 mt-16">
            <AudioPlayer :option="{
                src: `http://localhost:3030/stream/${$route.params.trackId}`,
                title: musicName,
                coverImage: `http://localhost:3030/image/${albumName}`,
                indicatorColor: '#FF1744',
                progressBarColor: '#616161',
           }" />
          </v-card>
        </v-main>
    </v-app>
</template>
<script>
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'

export default {
  props: ['trackId'],
  components: {
    AudioPlayer
  },
  data() {
    return {

      albumName: '',

      musicName: '',

      artistName: ''

    }
  },
  mounted(){
    fetch(`http://localhost:3030/track/${this.trackId}`)
        .then(res => res.json())
        .then(data => {
          this.albumName = data.album;
          this.musicName = data.name;
          this.artistName = data.artist; 
        })
        .catch(err => console.log(err.message))
  }

}
</script>