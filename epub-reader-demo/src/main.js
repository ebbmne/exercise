import Vue from "vue";
import App from "./App.vue";
import "./assets/iconfont/iconfont.css";
import "./assets/styles/global.scss";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
