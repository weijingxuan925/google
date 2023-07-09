import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios';

// 在这里创建 axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000' // 根据你的后端 API 地址进行修改
});

loadFonts()

const app = createApp(App)

// 将 axios 实例注册为全局对象
app.config.globalProperties.$http = axiosInstance;

app
    .use(router)
    .use(vuetify)
    .mount('#app')
