import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);


import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import axios from 'axios'

Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://157.245.97.214:8080/demo/'
    })
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
