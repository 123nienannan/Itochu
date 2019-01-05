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
      component: Login,
      meta: {
        title: '登录'
     }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/users',
          component: UserList,
          name: 'UserList',
          meta: {
            title: '人员管理'
         }
        },
        {
          path: '/usersVip',
          component: userVipList,
          name: 'userVipList',
          meta: {
            title: '特殊人员'
         }
        },
        {
          path: '/mangement',
          component: testMange,
          name: 'testMange',
          meta: {
            title: '考勤管理'
         }
        },
        {
          path: '/access',
          component: Access,
          name: 'Access',
          meta: {
            title: '出入记录'
         }
        },
        {
          path: '/right',
          component: rightAdmin,
          name: 'rightAdmin',
          meta: {
            title: '管理员'
         }
        }
      ]
    },
    {
      path: '/linkPage',
      name: 'LinkPage',
      component: LinkPage,
      meta: {
        title: '伊藤忠'
     }
    }
  ]
})

export default router
