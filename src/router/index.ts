import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Register from '../components/Register.vue'
import About from '../components/About.vue'
import NotFound from '../components/NotFound.vue'
import CeShi from '../components/CeShi.vue'
import Test from '../components/Test.vue'
import Cesium from '../components/Cesium.vue'
import Echart from '../components/Echart.vue'
import Echart1 from '../components/Echart1.vue'
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/about', name: 'About', component: About },
  { path: '/ceshi', name: 'CeShi', component: CeShi },
  { path: '/test', name: 'Test', component: Test },
  { path: '/cesium', name: 'Cesium', component: Cesium },
  { path: '/echart', name: 'Echart', component: Echart },
  { path: '/echart1', name: 'Echart1', component: Echart1 },
  { path: '/:path(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),//将process.env改成import.meta.env。因为vite中把这个旧版本特性删除了，所以会出错。
  routes
})

export default router
