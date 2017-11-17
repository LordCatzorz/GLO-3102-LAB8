import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/login/LoginPage'
import UserProfile from '@/components/userprofile/UserProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: UserProfile
    },
    {
      path: '/userprofile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    }
  ]
})
