import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/login.vue";
import Home from "@/components/home/home.vue";
import Users from "@/components/users/users.vue";
import Right from "@/components/rights/right.vue";
import Role from "@/components/rights/role.vue";
import Goodslist from "@/components/goods/goodslist.vue";
import GoodsAdd from "@/components/goods/goodsadd.vue";
import CateParams from "@/components/goods/cateparams.vue";
import GoodsCate from "@/components/goods/goodscate.vue";
import { Message } from "element-ui";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: "login",
      path: "/login",
      component: Login
    },
    {
      name: "home",
      path: "/",
      component: Home,
      children: [
        {
          name: "users",
          path: "users",
          component: Users
        },
        {
          name: "right",
          path: "/rights",
          component: Right
        },
        {
          name: "roles",
          path: "/roles",
          component: Role
        },
        {
          name: "goods",
          path: "/goods",
          component: Goodslist
        },
        {
          name: "goodsadd",
          path: "/goodsadd",
          component: GoodsAdd
        },
        {
          name: "params",
          path: "/params",
          component: CateParams
        },
        {
          name: "categories",
          path: "/categories",
          component: GoodsCate
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = localStorage.getItem("token");
    if (!token) {
      Message.warning("请先登录");
      router.push({
        name: "login"
      });
    } else {
      next();
    }
  }
});
export default router;
