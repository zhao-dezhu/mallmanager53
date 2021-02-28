// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import MyBread from "@/components/cuscom/myBread.vue";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.css";
import moment from "moment";
import router from "./router";
import MyServerHttp from "@/plugins/http.js";
Vue.use(ElementUI);
//开发axios插件
Vue.use(MyServerHttp);

Vue.config.productionTip = false;

Vue.filter("fmtdate", v => {
  return moment(v).format("YYYY-MM-DD");
});
/* eslint-disable no-new */
Vue.component(MyBread.name, MyBread);
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
