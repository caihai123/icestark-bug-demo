import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/*
对VueRouter原型链上的push、replace方法进行重写
为了解决某些情况下控制台报 ‘Uncaught (in promise) undefined’的问题
参考地址：https://github.com/vuejs/vue-router/issues/2881
*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
  },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  routes,
});

let currentPath;
window.addEventListener("appstate-change", function (e) {
  if (e.detail.appState === "afterhidden") {
    currentPath = router.history.current.path;
  } else if (e.detail.appState === "aftershow") {
    router.push(currentPath);
  }
});

export default router;
