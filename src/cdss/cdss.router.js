import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/CDSSHome'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/360',
      name: 'home2',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/Disease360History'),
      meta: {
        title: '首页'
      }
    }
  ]
})
