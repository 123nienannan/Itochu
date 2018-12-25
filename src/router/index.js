import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Main from '@/components/main/Main'
import UserList from '@/components/UserList'
import userVipList from '@/components/uservip'
import testMange from '@/components/textmange'
import Access from '@/components/access'
import rightAdmin from '@/components/right'
import LinkPage from '@/components/linkPage/LinkPage'

Vue.use(Router)

const router = new Router({
  mode:"history",
  // base: "itochuWeb",
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


export default router
