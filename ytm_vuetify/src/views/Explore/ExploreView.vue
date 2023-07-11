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
          <v-col v-for="playlist in playlists" :key="playlist._id" cols="12" sm="6" md="4" lg="2">
            <v-card @click="goToPlaylist(playlist._id)">
              <v-sheet height="150">
                {{ playlist.name }}
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      drawer: null,
      playlists: [], // 存储从数据库中获取的播放列表数据
    };
  },

  mounted() {
    // 在组件加载后从数据库中获取播放列表数据
    this.getPlaylists();
  },

  methods: {
    goToAlbum(albumId) {
      // 使用Vue Router导航到专辑页面
      this.$router.push({ name: 'album', params: { albumId } });
    },

    goToPlaylist(playlistId) {
      // 使用Vue Router导航到播放列表页面
      this.$router.push({ name: 'playlist', params: { playlistId } });
    },

    getPlaylists() {
      // 从数据库中获取播放列表数据的逻辑
      // 使用适当的方法（例如axios）发送请求，并将响应数据存储在playlists数组中
      // 示例：使用axios发送GET请求
      axios
          .get('http://localhost:3000/api/playlists')
          .then(response => {
            this.playlists = response.data;
          })
          .catch(error => {
            console.error('Error retrieving playlists:', error);
          });
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
