import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Explore from "./components/Explore.vue";
import Library from "./components/Library.vue";
import Login from "./components/Login.vue"; // 确认文件路径和文件名正确
import Register from "./components/Register.vue"; // 确认文件路径和文件名正确
import Home from "./components/Home.vue"; // 导入Home组件
const routes = [
    { path: "/", component: Home }, // 添加根路径的路由
    { path: "/explore", component: Explore },
    { path: "/library", component: Library },
    { path: "/login", component: Login }, // 添加登录路由
    { path: "/register", component: Register } // 添加注册路由
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount("#app");
