import './style.css'

import { createApp } from 'vue'

import App from './App.vue'
import { registerGlobalComponents } from './common/globalComponents'
import { registerPlugins } from './common/plugins'

const app = createApp(App)

// Register plugins first
registerPlugins(app)
registerGlobalComponents(app)

// Mount the app last
app.mount('#app')
