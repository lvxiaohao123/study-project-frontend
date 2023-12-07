<<<<<<< HEAD
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import axios from "axios";

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8088'

app.use(createPinia())
app.use(router)

app.mount('#app')
=======
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import axios from "axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import Footer from './components/Footer.vue'
import Main from './components/Main.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.component('Header',Header)
app.component('Banner',Banner)
app.component('Footer',Footer)
app.component('Main',Main)

axios.defaults.baseURL = 'http://localhost:8088'

app.use(createPinia())
app.use(router)

app.mount('#app')
>>>>>>> 7c1193a199751c6d0cf41735b5158d7a66f6124a
