<template>
  <v-app id="inspire">
    <v-main class="bg-grey-darken-3">
      <v-container>
        <v-row>
          <v-col v-for="l in list" :key="`${l}`" md="3">
            <v-card class="mx-auto" max-width="344">
              <v-img
                src="https://appsgeyser.io/geticon.php?widget=PlusPremieres_5436141&width=512"
                height="200px"
                cover
              ></v-img>

              <v-card-title> {{l.playlistName}} </v-card-title>

              <v-card-actions>
                <router-link :to="`/personalList/${l.playlistId}`">
                  <v-btn color="red-lighten-3" variant="text"> Enter </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {

  data() {
    return {
      list: []
    };
  },
  mounted() {

    axios.get( 
      'http://localhost:3030/playlist', {
      mode: 'no-cors',
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        //console.log(data);
        this.list = data.data;
      })
      .catch((err) => console.log(err.message));
  }
      
};
</script>

<style>
</style>