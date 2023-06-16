<template>
  <div>
    <h1>Library Page</h1>
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
  name: "LibraryPage", // Update the component name to be multi-word
  data() {
    return {
      playlists: [], // User's playlists
    };
  },
  mounted() {
    // Fetch the user's playlists data from the backend and set it to the playlists array
    this.fetchUserPlaylists();
  },
  methods: {
    async fetchUserPlaylists() {
      try {
        const response = await fetch("/api/user/playlists"); // Send a request to fetch the user's playlists data
        this.playlists = await response.json(); // Set the retrieved data to the playlists array
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Add styles to enhance the Library page */
</style>
