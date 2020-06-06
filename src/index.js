import _Preview from './Preview.vue'
import Vue from 'vue'

const defaultOptions = {
  data: [],
  scale: 1.5,
  rotate: 90
}
function Preview (config = {}) {
  config = Object.assign(defaultOptions, config)
  const preview = createInstance()
  Object.assign(preview, config)
  preview.$on('close', () => {
    if (config.onClose) {
      config.onClose()
    }
    preview.$destroy()
  })
}

function createInstance () {
  const preview = new (Vue.extend(_Preview))()
  const vm = preview.$mount()
  document.body.appendChild(vm.$el)
  return preview
}

Preview.install = () => {
  Vue.component('vue-preview', Preview)
}

Vue.prototype.$preview = Preview

export default Preview
