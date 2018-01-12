import Vue from 'vue'
import Router from 'vue-router'
import Popup from '@/components/popup'
import Second from '@/components/second'
import JobTask from '@/components/jobTaskProc-info'
import Create from '@/components/create'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Popup',
      component: Popup
    },{
      path: '/second',
      name: 'second',
      component: Second
    },{
      path: '/jobTask',
      name: 'jobTask',
      component: JobTask
    },{
      path: '/create',
      name: 'create',
      component: Create
    }

  ]
})
