import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from "axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import Footer from './components/Footer.vue'
import Main from './components/Main.vue'
import ECharts from 'vue-echarts';
// import ECharts from 'vue-echarts';
import 'echarts';
import dayjs from 'dayjs';
import { DateTime } from 'luxon';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$DateTime = DateTime;
app.config.globalProperties.$dayjs = dayjs;
app.component('v-chart', ECharts);
app.component('Header',Header)
app.component('Banner',Banner)
app.component('Footer',Footer)
app.component('Main',Main)

axios.defaults.baseURL = 'http://localhost:8088'

app.use(ElementPlus);
app.use(createPinia())
app.use(router)

app.mount('#app')
