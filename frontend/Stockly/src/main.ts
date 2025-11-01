import './assets/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import { Toaster } from 'vue-sonner'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import FloatingButton from '@/components/ui/FloatingActionButton.vue'
const app = createApp(App)
app.component('FloatingButton', FloatingButton)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.component('Toaster', Toaster)
app.use(router)
app.use(naive)
app.mount('#app')
