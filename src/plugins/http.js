import axios from "axios";

const MyHttpServer = {};

MyHttpServer.install = Vue => {
  axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";

  axios.interceptors.request.use(
    function(config) {
      if (config.url !== "login") {
        const AUTH_TOKEN = localStorage.getItem("token");
        config.headers["Authorization"] = AUTH_TOKEN;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  // 添加实例方法
  Vue.prototype.$http = axios;
};

export default MyHttpServer;
