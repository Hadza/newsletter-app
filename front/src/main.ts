import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { Quasar, Notify } from "quasar";
import "./styles/quasar.scss";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";

const quasarUserOptions = {
  config: {
    supportTS: true,
  },
  plugins: { Notify },
};

const pinia = createPinia();
const app = createApp(App)
  .use(pinia)
  .use(Quasar, quasarUserOptions)
  .use(router);

app.mount("#app");
