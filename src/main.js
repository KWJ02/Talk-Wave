import { createApp } from 'vue'
import App from './App.vue'
import vuetify from "./plugins/vuetify";
import axiosInstance from './plugins/axiosInstance';

import "@/assets/css/main.css";

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;

// 경고 메시지 비활성화
app.config.warnHandler = () => {
    // 경고 메시지를 무시함
};

app.directive('focus', {
    mounted(el) {
        el.focus(); // 요소가 마운트되면 포커스를 설정
    }
});

app.use(vuetify);  // Vuetify를 Vue 앱에 적용
app.mount("#app");