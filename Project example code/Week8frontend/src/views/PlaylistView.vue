<template>
  <v-app id="inspire">
    <v-main class="bg-grey-darken-3">
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="t in trackList"
                  :key="t"
                  :to="`/player/${t.trackId}`"
                  link
                >
                  <v-list-item-title>
                    {{ t.name }}
                  </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey-lighten-4">
                  <v-list-item-title> Refresh </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="7">
            <v-card class="mx-auto" max-width="350">
              <v-img
                :src="`http://localhost:3030/image/${$route.params.album}`"
                height="260px"
                cover
              ></v-img>

              <v-card-title>
                {{ $route.params.album }}
              </v-card-title>

              <v-card-subtitle>
                {{ artist }}
              </v-card-subtitle>

              <v-spacer></v-spacer>
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
  props: ["album"],
  data() {
    return {
      trackList: [],

      artist: "",
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3030/musicList/${this.album}`, {
        mode: "no-cors",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        this.trackList = data.data;
        this.artist = data.data[0].artist;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
</style>