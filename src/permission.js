import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
// 路由拦截去哪里
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  // const hasUserName = store.getters.name || sessionStorage.getItem('name')
  if (hasToken) {
    if (to.path === '/login') {
      console.log('hahhahahh')
      // 去首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 用户名还存在
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // const hasUserName = store.getters.name
      if (hasRoles) {
        next()
      } else {
        try {
          // 用户名不存在 重新获取接口
          // const personName = sessionStorage.getItem('name')
          // const userId = sessionStorage.getItem('userId')
          // const obj = {
          //   personName,
          //   userId
          // }
          const roles = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
          // next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 第一个 to login访问
      // console.log('dddddddddddddd')
      next()
    } else {
      // console.log('bbbbbbbbbbbbbbb')
      // 其他页面没有某个页面访问权限, 重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
