import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  console.log(location)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    redirect: to => 'DiseaseEntry',
    children: [
      {
        path: 'DiseaseEntry',
        name: 'DiseaseEntry',
        component: () => import(/* webpackChunkName: "about" */ '@/views/DiseaseEntry.vue'),
        meta: {
          title: '首页',
          index: 1
        }
      },
      {
        path: 'DiseaseList',
        component: () => import('@/views/DiseaseList.vue'),
        children: [
          {
            path: '/',
            name: 'DiseaseDetail',
            component: () => import('@/views/DiseaseDetail.vue'),
            meta: {
              title: '病人列表',
              index: 2
            }
          },
          {
            path: 'DiseaseDetail360',
            name: '360',
            component: () => import('@/views/Disease360.vue'),
            meta: {
              title: ' 360视图',
              index: 3
            }
          },
          {
            path: 'DiseaseDetail360History',
            name: 'History',
            component: () => import('@/views/Disease360History.vue'),
            meta: {
              title: ' 全景图',
              index: 4
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    redirect: to => {},
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem('token')
  // if (to.name === 'Login') {
  //   next()
  // } else {
  //   if (token) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
  next()
})

export default router
