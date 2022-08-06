import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import BalmUI from "balm-ui"; // Official Google Material Components

import "balm-ui-css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(BalmUI);
app.use(router);
app.mount("#app");
