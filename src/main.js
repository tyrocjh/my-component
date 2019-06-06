import Vue from 'vue'
import App from './App'
import EasyToast from './plugins/easy-toast'

Vue.config.productionTip = false

// toast提示插件
Vue.use(EasyToast, {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  duration: 1500
})

new Vue({
  render: h => h(App),
}).$mount('#app')
