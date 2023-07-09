<template>   
    <v-app-bar color="bg-light-blue-darken-3">
        <v-container class="fill-height d-flex align-center">
            <v-icon color="blue" icon="mdi-vuetify" size="large"></v-icon>
<!--             <v-icon icon="$vuetify"></v-icon>-->
<!--           <v-img src="ytm_vuetify/src/assets/logo.png" width="28" height="28"></v-img>-->
            <v-toolbar-title>Player</v-toolbar-title>

          <v-spacer></v-spacer>

            <v-btn variant="text" to="/">
                Home
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn variant="text" to="/library">
                Library
            </v-btn>
            <v-spacer></v-spacer>

            <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search Music"
            append-inner-icon="mdi-magnify"
            size="x-large"
            single-line
            hide-details
            @click:append-inner="onClick"
            ></v-text-field>
            <v-spacer></v-spacer>
          <v-btn to="/login">
            <span>Login</span>
          </v-btn>
          <!-- TODO: 添加info页面，介绍项目 -->
          <v-btn icon="mdi-information" size="small" to="/info"></v-btn>
        </v-container>         
    </v-app-bar>
</template>

<script>
    export default {
        name: 'NavigationBar'
    }
</script>
