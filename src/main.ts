import './assets/main.css'
// import 'ant-design-vue/dist/reset.css';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(ElementPlus)

app.use(naive)
app.mount('#app')
