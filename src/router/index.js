import Vue from 'vue'
import Router from 'vue-router'
import {SvgMain} from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: SvgMain
    }
  ]
})
