import  { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Bootstrap Library
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/js/bootstrap.js"
// Aos Library
import 'aos/dist/aos.css'

createApp(App).use(router).mount('#app')


