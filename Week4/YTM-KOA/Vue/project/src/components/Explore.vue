<template>
  <div>
    <h1>Explore Page</h1>
    <ul>
      <li v-for="playlist in playlists" :key="playlist.album">
        <h3>{{ playlist.album }}</h3>
        <ul>
          <li v-for="song in playlist.songs" :key="song.track_id">
            {{ song.title }} - {{ song.artist[0] }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ExplorePage", // Modify the component name to use multiple words
  data() {
    return {
      playlists: [], // Playlist from the music library
    };
  },
  mounted() {
    // Fetch the playlists data from the backend and set it to the playlists array
    this.fetchPlaylists();
  },
  methods: {
    async fetchPlaylists() {
      try {
        const response = await fetch("/api/playlists"); // Send a request to fetch the playlists data
        this.playlists = await response.json(); // Set the retrieved data to the playlists array
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Add styles to enhance the Explore page */
</style>
