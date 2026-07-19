import '@/assets/tailwind.css';
import '@/assets/global.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
