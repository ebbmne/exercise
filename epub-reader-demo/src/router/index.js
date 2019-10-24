import Vue from "vue";
import VueRouter from "vue-router";

import EBook from "@/EBook.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "root",
    path: "/",
    redirect: "/ebook"
  },
  {
    name: "ebook",
    path: "/ebook",
    component: EBook
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;