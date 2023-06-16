import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Explore from "./components/Explore.vue";
import Library from "./components/Library.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import { createVuetify } from "vuetify";
import "vuetify/dist/vuetify.min.css";

const routes = [
    { path: "/", component: Home },
    { path: "/explore", component: Explore },
    { path: "/library", component: Library },
    { path: "/login", component: Login },
    { path: "/register", component: Register }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const vuetify = createVuetify();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
