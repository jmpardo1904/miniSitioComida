import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from "./store"


const app = createApp(App)
app.use(router);
app.use(VueSweetalert2);
app.use(store);
app.mount('#app');
