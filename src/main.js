import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import store from './stores';
import Antd from 'ant-design-vue';


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'ant-design-vue/dist/antd.css';

createApp(App)
    .use(router)
    .use(store)
    .use(Antd)
    .mount('#app')