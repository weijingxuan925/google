<template>
  <v-app id="inspire">
    <v-main class="bg-blue-lighten-5">
      <v-container>
        <v-row>
          <template v-for="n in 1" :key="n">
            <v-col class="mt-2" cols="12">
              <strong>推荐 Albums</strong>
            </v-col>
            <v-col v-for="j in 6" :key="`${n}${j}`" cols="6" md="2">
              <v-card @click="goToAlbum(albumId)">
                <v-sheet height="150"></v-sheet>
              </v-card>
            </v-col>
          </template>
        </v-row>
        <v-row>
          <template v-for="n in 1" :key="n">
            <v-col class="mt-2" cols="12">
              <strong> 推荐 Playlists</strong>
            </v-col>
            <v-col v-for="j in 6" :key="`${n}${j}`" cols="6" md="2">
              <v-card @click="goToPlaylist(playlistId)">
                <v-sheet height="150"></v-sheet>
              </v-card>
            </v-col>
          </template>
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
      // Navigate to the album page with the given albumId
      // You can use a router library or any other method to handle navigation
    },

    goToPlaylist(playlistId) {
      // Navigate to the playlist page with the given playlistId
      // You can use a router library or any other method to handle navigation
    },
  },
};
</script>
