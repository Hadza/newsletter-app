import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import UnsubscribeView from "../views/UnsubscribeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/topic/unsubscribe/:topic/:user",
    name: "unsubscribe",
    component: UnsubscribeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
