import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { createPinia } from 'pinia'
import installFontawesome from './plugins/fontawesome'
//引入echarts
import * as echarts from 'echarts';

import router from './router/index'

const app = createApp(App)
installFontawesome(app)
// 实例化 Pinia
const pinia = createPinia()
app.use(ElementPlus, {
  locale: zhCn
})
//放入全局
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(pinia)
app.mount('#app')
//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}




