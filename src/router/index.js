import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import channelRouter from './modules/channelRouter'
import teamRouter from './modules/teamRouter'
// import membersRouter from './modules/memberRouter'
import chartsRouter from './modules/charts'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
// 权限路由
export const asyncRoutes = [
  {
    path: '/authManager',
    component: Layout,
    redirect: '/authManager/page',
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限'
        }
      },

      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '用户管理'
        }
      }
    ]
  },
  channelRouter,
  teamRouter,
  // membersRouter,
  chartsRouter,
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  base: 'sweating-manager',
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 })
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
