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
        path: "promotions",
        name: "promotions",
        meta: { title: "Promotions" },
        component: () => import("@/pages/Promotions.vue"),
      },
      {
        path: "analytics",
        name: "analytics",
        meta: { title: "Analytics" },
        component: () => import("@/pages/Analytics.vue"),
      },
      {
        path: "customers",
        name: "customers",
        meta: { title: "Customers" },
        component: () => import("@/pages/Customers.vue"),
      },
      {
        path: "apps",
        name: "apps",
        meta: { title: "Apps" },
        component: () => import("@/pages/Apps.vue"),
      },
      {
        path: "plans",
        name: "plans",
        meta: { title: "Plans" },
        component: () => import("@/pages/Plans.vue"),
      },
      {
        path: "settings",
        name: "settings",
        meta: { title: "Settings" },
        component: () => import("@/pages/Settings.vue"),
      },
      {
        path: "user-guide",
        name: "user-guide",
        meta: { title: "User Guide" },
        component: () => import("@/pages/UserGuide.vue"),
      },
      {
        path: "demo",
        name: "demo",
        meta: { title: "Visit My Store" },
        component: () => import("@/pages/Demo.vue"),
      },
      {
        path: "demo-app",
        name: "demo-app",
        meta: { title: "Get Demo App" },
        component: () => import("@/pages/DemoApp.vue"),
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
