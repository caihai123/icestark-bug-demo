import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

let childList = [];

// 动态加载子应用
router.beforeEach(async (to, from, next) => {
  if (["/", "/about"].includes(to.path)) {
    next();
  } else {
    if (childList.length <= 0) {
      childList = [
        {
          baseUrl: "/child-1",
          url: "http://localhost:1235/",
          name: "Child1",
        },
        {
          baseUrl: "/child-2",
          url: "http://localhost:1236/",
          name: "Child2",
        },
      ];
      childList.forEach((item) => {
        router.addRoute({
          path: item.baseUrl,
          name: item.name,
          component: {
            render(h) {
              return h("micro-app", {
                attrs: {
                  name: item.name,
                  url: item.url,
                  baseroute: item.baseUrl,
                  "keep-alive": true,
                },
              });
            },
          },
        });
      });
      next({ ...to, replace: true });
    } else {
      next();
    }
  }
});

export default router;
