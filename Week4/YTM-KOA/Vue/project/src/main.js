import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Explore from "./components/Explore.vue";
import Library from "./components/Library.vue";

const routes = [
    { path: "/explore", component: Explore },
    { path: "/library", component: Library }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount("#app");
