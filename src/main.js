// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// axios.defaults.baseURL="http://192.168.0.108:8097"
Vue.use(ElementUI)

// Vue.prototype.$http= axios
Vue.config.productionTip = false

//定义一个全局过滤器实现日期格式化
// Vue.filter('datafmt',function (input,fmtstring) {
//   return moment(input).format(fmtstring);
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
