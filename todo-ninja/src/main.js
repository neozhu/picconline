import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
