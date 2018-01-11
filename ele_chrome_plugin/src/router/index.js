import Vue from 'vue'
import Router from 'vue-router'
import Popup from '@/components/popup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Popup',
      component: Popup
    }
  ]
})
