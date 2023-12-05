import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import axios from "axios";
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import Footer from './components/Footer.vue'


const app = createApp(App)

app.component('Header',Header)
app.component('Banner',Banner)
app.component('Footer',Footer)


axios.defaults.baseURL = 'http://localhost:8088'

app.use(createPinia())
app.use(router)

app.mount('#app')
