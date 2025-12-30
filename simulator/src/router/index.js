import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/landingPage.vue"),
  },
  {
    path: "/simulation",
    name: "simulation",
    component: () => import("../components/simulationPage.vue"),
  },
  {
    path: "/queue",
    name: "queue",
    component: () => import("../components/queueCalculator.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
