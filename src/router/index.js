import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import Home from '@/views/Home'
import HomeContent from '@/views/HomeContent'
import Profile from '@/views/Profile'
import BlogList from '@/components/BlogList'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '*', redirect: '/login'},
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'login', component: Login},
    {path: '/sign-up', name: 'sign-up', component: SignUp},
    {path: '/home', component: Home, meta: {requiresAuth: true},
      children: [
        {
          path: '',
          component: HomeContent,
          children: [
            {
              path: '',
              name: 'home',
              component: BlogList,
              meta: {
                blog: true
              }
            },
            {
              path: ':page',
              component: BlogList,
              meta: {
                blog: true
              }
            }
          ]
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) next('login')
  else if (!requiresAuth && user) next('home')
  else next()
})

export default router
