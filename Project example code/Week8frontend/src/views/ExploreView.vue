<template>
  <v-app id="inspire">
    <v-main class="bg-grey-darken-3">
      <v-container>
        <v-row>
          <template v-for="l in list" :key="l">
            <v-col class="mt-2" cols="12">
              <strong>{{ l.title }}</strong>
            </v-col>

            <v-col v-for="j in l.album" :key="`${j}`" cols="6" md="2">
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
  import axios from 'axios'

export default {
  data() {
    return {
      list: [
        { title: "Album", album: [] },

        { title: "Playlist", album: [] },
      ],
    };
  },

  mounted() {
    axios.get( 
      'http://localhost:3030/album', {
      mode: 'no-cors',
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        //console.log(data);
        this.list[0].album = data.data;
        this.list[1].album = data.data;
      })
      .catch((err) => console.log(err.message));


      if (localStorage.getItem('reloaded')) {
        localStorage.removeItem('reloaded');
    } else {
        localStorage.setItem('reloaded', '1');
        location.reload();
    }

  }
      

      
};
</script>