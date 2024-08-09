import './assets/main.scss'

import { createApp, provide, ref } from 'vue'
import App from './App.vue'
import type { Convo } from './lib/convo';
import { Utils } from './lib/utils';

const app = createApp(App);
app.mount('#app');