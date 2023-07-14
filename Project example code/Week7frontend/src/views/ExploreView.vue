<template>
  <v-app id="inspire">
    <v-main class="bg-grey-darken-3">
      <v-container>
        <v-row>
          <template v-for="l in list" :key="l">
            <v-col
              class="mt-2"
              cols="12"
            >
              <strong>{{ l.title }}</strong>
            </v-col>

            <v-col
              v-for="j in l.album"
              :key="`${j}`"
              cols="6"
              md="2"
            >
              <router-link :to="`/playlist/${j}`">
                <v-img
                  :src="`http://localhost:3030/image/${j}`"
                  aspect-ratio="1"
                ></v-img>
              </router-link>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  </template>
  
  <script>
    export default {
      data(){
        return {
          list: [
            {title: 'Album', album: []},

            {title: 'Playlist', album: []}
          ]
        }
      },
      mounted(){
        fetch('http://localhost:3030/album')
        .then(res => res.json())
        .then(data => {
          this.list[0].album = data;
          this.list[1].album = data;
        })
        .catch(err => console.log(err.message))
      }
    }
  </script>