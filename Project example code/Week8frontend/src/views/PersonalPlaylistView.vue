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
      
                      <v-list-item
                        link
                        color="grey-lighten-4"
                      >
                        <v-list-item-title>
                          Refresh
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-sheet>
                </v-col>
      
                <v-col cols="7">
                  <v-card
                    class="mx-auto"
                    max-width="350"
                  >
                    <v-img
                      :src="`https://appsgeyser.io/geticon.php?widget=PlusPremieres_5436141&width=512`"
                      height="260px"
                      cover
                    ></v-img>

                    <v-card-title>
                      {{ $route.params.playlistName }}
                    </v-card-title>

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
  props: ['playlistId'],
  data() {
    return {

      trackList: []

    }
  },
  mounted(){
      axios.get(`http://localhost:3030/playlist/${this.playlistId}`, {
        mode: "no-cors",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        console.log(data.data);
        this.trackList = data.data;
      })
      .catch((err) => console.log(err.message));
  }

}
</script>

<style>

</style>