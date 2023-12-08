import { createRouter, createWebHistory } from 'vue-router'
import {useStore} from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      children: [
        {
          path: '',
          name: 'welcome-login',
          component: () => import('@/components/welcome/LoginPage.vue')
        }, {
          path: 'register',
          name: 'welcome-register',
          component: () => import('@/components/welcome/RegisterPage.vue')
        }, {
          path: 'forget',
          name: 'welcome-forget',
          component: () => import('@/components/welcome/ForgetPage.vue')
        }
      ]
    }, {
      path: '/index',
      name: 'index',
      component: () => import('@/views/IndexView.vue')
    }, {
      path: '/Admin',
      name: 'Admin',
      component: () => import('@/views/AdminView.vue')
    }, {
      path: '/Forum',
      name: 'Forum',
      component: () => import('@/views/ForumView.vue')
    }, {
      path: '/Shop',
      name: 'Shop',
      component: () => import('@/views/ShopView.vue')
    }, {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/UserHome.vue')
    }, {
      path: '/News',
      name: 'News',
      component: () => import('@/views/NewsView.vue')
    },{
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutUser.vue')
    },{
      path: '/AddPost',
      name: 'AddPost',
      component: () => import('@/views/AddPost.vue')
    }
    ,{
      path: '/news/:id',
      name: 'NewsDetail',
      component: () => import('@/views/NewsDetail.vue'), // 替换成你的实际组件路径
      props: true // 将路由参数作为组件的 props 传递
    },{
      path: '/post/:id',
      name: 'PostDetail',
      component: () => import('@/views/PostDetail.vue'), // 替换成你的实际组件路径
      props: true // 将路由参数作为组件的 props 传递
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if(store.auth.user != null && to.name && to.name.startsWith('welcome-')) {
    next('/index')
  } else if(store.auth.user == null && to.fullPath.startsWith('/index')) {
    next('/')
  } else if(to.matched.length === 0){
    next('/index')
  } else {
    next()
  }
})



export default router
