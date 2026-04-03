import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { applySeo } from './utils/seo'

const app = createApp(App)

app.use(router)

router.isReady().then(() => {
	const routeKey = typeof router.currentRoute.value.name === 'string' ? router.currentRoute.value.name : 'home'
	applySeo(routeKey as Parameters<typeof applySeo>[0])
	app.mount('#app')
})
