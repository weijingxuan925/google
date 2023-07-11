<template>
  <v-app id="inspire">
    <v-main class="bg-blue-lighten-5">
      <v-container>
        <v-row>
          <v-col class="mt-2" cols="12">
            <strong>推荐 Albums</strong>
          </v-col>
          <v-col v-for="j in 6" :key="j" cols="12" sm="6" md="4" lg="2">
            <v-card @click="goToAlbum(albumId)">
              <v-sheet height="150"></v-sheet>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-2" cols="12">
            <strong>推荐 Playlists</strong>
          </v-col>
          <v-col v-for="j in 6" :key="j" cols="12" sm="6" md="4" lg="2">
            <v-card @click="goToPlaylist(playlistId)">
              <v-sheet height="150"></v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: null }),

  methods: {
    goToAlbum(albumId) {
      // 使用Vue Router导航到专辑页面
      this.$router.push({ name: 'album', params: { albumId } });
    },

    goToPlaylist(playlistId) {
      // 使用Vue Router导航到播放列表页面
      this.$router.push({ name: 'playlist', params: { playlistId } });
    },
  },
};
</script>

<style>
.v-sheet {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

strong {
  font-weight: bold;
  font-size: 20px;
}
</style>
