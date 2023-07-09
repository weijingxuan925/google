<template>
  <v-container class="info-page">
    <v-card>
      <v-card-title class="headline">Information</v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="6" class="text-center">
            <v-img src="src/assets/logo.png" alt="Info Image" width="150px" height="150px"></v-img>
          </v-col>
          <v-col cols="12" sm="6">
            <h3 class="info-title">Author:</h3>
            <h3>JingxuanWei</h3>
            <br>
            <p class="info-description">Project for Music Player</p>
            <v-btn color="primary">Learn More</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'InfoPage',
};
</script>
<style scoped>
.info-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.info-title {
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.info-description {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>