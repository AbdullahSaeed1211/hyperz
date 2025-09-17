import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { title: "Dashboard" },
        component: () => import("@/pages/Dashboard.vue"),
      },
      {
        path: "orders",
        name: "orders",
        meta: { title: "Orders" },
        component: () => import("@/pages/Orders.vue"),
      },
      {
        path: "orders/heatmap",
        name: "orders-heatmap",
        meta: { title: "Orders Heatmap" },
        component: () => import("@/pages/Heatmap.vue"),
      },
      {
        path: "merchants",
        name: "merchants",
        meta: { title: "Merchants" },
        component: () => import("@/pages/Merchants.vue"),
      },
      {
        path: "customers",
        name: "customers",
        meta: { title: "Customers" },
        component: () => import("@/pages/Customers.vue"),
      },
      {
        path: "settings",
        name: "settings",
        meta: { title: "Settings" },
        component: () => import("@/pages/Settings.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
