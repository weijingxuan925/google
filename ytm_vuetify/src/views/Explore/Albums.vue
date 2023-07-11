<template>
  <div>
    <h2>推荐 Albums</h2>
    <ul>
      <li v-for="album in recommendedAlbums" :key="album.id" @click="goToAlbum(album.id)">
        <img :src="album.cover" alt="Album Cover" />
        <p>{{ album.title }}</p>
        <p>{{ album.description }}</p>
      </li>
    </ul>

    <h2>推荐 Playlists</h2>
    <ul>
      <li v-for="playlist in recommendedPlaylists" :key="playlist.id">
        <img :src="playlist.cover" alt="Playlist Cover" />
        <p>{{ playlist.title }}</p>
        <p>{{ playlist.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendedAlbums: ["1","2"],
      recommendedPlaylists: [],
    };
  },
  mounted() {
    // Make API requests to get recommended albums and playlists
    this.fetchRecommendedAlbums();
    this.fetchRecommendedPlaylists();
  },
  methods: {
    fetchRecommendedAlbums() {
      // Make a GET request to the /album endpoint
      // Update the recommendedAlbums data with the response data
    },
    fetchRecommendedPlaylists() {
      // Make a GET request to the /playlist endpoint
      // Update the recommendedPlaylists data with the response data
    },
    goToAlbum(albumId) {
      // 使用Vue Router导航到专辑页面
      this.$router.push({ name: 'album', params: { albumId } });
    },
  },
};
</script>
