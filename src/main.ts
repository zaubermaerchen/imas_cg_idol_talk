import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import App from './App.vue'
import { dependencyProviderPlugin } from '@/plugins/dependencyProviderPlugin.ts'

const app = createApp(App)
app.use(ElementPlus)
app.use(dependencyProviderPlugin)
app.mount('#app')
