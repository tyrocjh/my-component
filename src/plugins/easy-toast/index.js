import EasyToastVue from './EasyToast'

export default {
  install(Vue, defaultOptions = {}) {
    const CONSTRUCTOR = Vue.extend(EasyToastVue)
    Object.assign(EasyToastVue.DEFAULT_OPT, defaultOptions)

    function toast(msg, options = {}) {
      options.message = msg
      let toast = new CONSTRUCTOR()
      if (!toast.$el) {
        let vm = toast.$mount()
        document.querySelector(options.parent || 'body').appendChild(vm.$el)
      }
      toast.queue.push(options)
    }
    Vue.toast = Vue.prototype.$toast = toast
  }
}
