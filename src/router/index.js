import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Login from '@/components/login/Login'
const Main = () => import(/* webpackChunkName: 'home' */ '@/components/main/Main')
// import Main from '@/components/main/Main'
// import UserList from '@/components/UserList'
const UserList = () => import(/* webpackChunkName: 'home' */ '@/components/UserList')
// import userVipList from '@/components/uservip'
const userVipList = () => import(/* webpackChunkName: 'home' */ '@/components/uservip')
// import testMange from '@/components/textmange'
const testMange = () => import(/* webpackChunkName: 'home' */ '@/components/textmange')
// import Access from '@/components/access'
const Access = () => import(/* webpackChunkName: 'home' */ '@/components/access')
// import rightAdmin from '@/components/right'
const rightAdmin = () => import(/* webpackChunkName: 'home' */ '@/components/right')
import LinkPage from '@/components/linkPage/LinkPage'

Vue.use(Router)

const router = new Router({
  mode:"history",
  base: "itochuWeb",
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/users',
          component: UserList,
          name: 'UserList'
        },
        {
          path: '/usersVip',
          component: userVipList,
          name: 'userVipList'
        },
        {
          path: '/mangement',
          component: testMange,
          name: 'testMange'
        },
        {
          path: '/access',
          component: Access,
          name: 'Access'
        },
        {
          path: '/right',
          component: rightAdmin,
          name: 'rightAdmin'
        }
      ]
    },
    {
      path: '/linkPage',
      name: 'LinkPage',
      component: LinkPage
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('token')
    return next()
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
    Message({
      message: '请先登录',
      type: 'warning'
    });
  }
})

export default router
