<template>   
    <v-app-bar color="grey-darken-4">
        <v-container class="fill-height d-flex align-center">
            
            <v-icon color="error" icon="mdi-vuetify" size="x-large"></v-icon>
            <v-toolbar-title>Music</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="text" to="/explore">
                Explore
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
            <v-btn icon="mdi-account" size="small" to="/login"></v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="Auth != `none` " @click="logout()" color="red-lighten-1" variant="tonal">Logout</v-btn>  
        </v-container>         
    </v-app-bar>
</template>

<script>
    import router from '../router/index.js'
    export default {
        name: 'NavigationBar',
        data() {
            return {
                Auth: localStorage.getItem("token")
            }
        },
        methods: {

            logout() {

                localStorage.setItem("token", "none");

                router.push({ path: '/login' });

                 window.location.reload();

            }

        },
    }
</script>
