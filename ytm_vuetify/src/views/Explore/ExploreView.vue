<template>
  <v-app id="inspire">
    <v-main class="bg-blue-lighten-5">
      <v-container>
        <v-row>
          <v-col class="mt-2" cols="12">
            <strong>推荐 Albums</strong>
          </v-col>
          <v-col v-for="album in recommendedAlbums" :key="album._id" cols="12" sm="6" md="4" lg="2" @click="goToAlbum(album._id)">
            <v-card>
              <v-sheet height="150">
                <img :src="getAlbumCoverUrl(album.cover)" alt="Album Cover" class="album-cover" />
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-2" cols="12">
            <strong>推荐 Playlists</strong>
          </v-col>
          <v-col v-for="playlist in playlists" :key="playlist._id" cols="12" sm="6" md="4" lg="2" @click="goToPlaylist(playlist._id)">
            <v-card>
              <v-sheet >
                <img :src="getPlaylistCoverUrl(playlist.playlistCover)" alt="Playlist Cover" class="playlist-cover" />
              </v-sheet>
              <p class="playlist-name">{{ playlist.name }}</p>
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
      recommendedAlbums: [], // 存储从数据库中获取的推荐专辑数据
      playlists: [], // 存储从数据库中获取的播放列表数据
    };
  },

  mounted() {
    // 在组件加载后从数据库中获取推荐专辑和播放列表数据
    this.fetchRecommendedAlbums();
    this.fetchPlaylists();
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

    async fetchRecommendedAlbums() {
      try {
        const response = await axios.get('http://localhost:3000/api/album');
        this.recommendedAlbums = response.data;
      } catch (error) {
        console.error('Error fetching recommended albums:', error);
      }
    },

    async fetchPlaylists() {
      try {
        const response = await axios.get('http://localhost:3000/api/playlists');
        this.playlists = response.data;
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    },

    getAlbumCoverUrl(coverPath) {
      const coverFileName = coverPath.split("/").pop();
      return `http://localhost:3000/cover/${coverFileName}`;
    },

    getPlaylistCoverUrl(coverPath) {
      const coverFileName = coverPath.split("/").pop();
      return `http://localhost:3000/cover/${coverFileName}`;
    }

  },
};
</script>

<style>
.album-cover,
.playlist-cover {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.playlist-name{
  text-align: center;
  font-size: 14px;
  background-color: skyblue;
}
</style>
