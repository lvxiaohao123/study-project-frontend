import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from "@/stores";

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
        },
        {
          path: 'register',
          name: 'welcome-register',
          component: () => import('@/components/welcome/RegisterPage.vue')
        },
        {
          path: 'forget',
          name: 'welcome-forget',
          component: () => import('@/components/welcome/ForgetPage.vue')
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/IndexView.vue')
    },
    {
      path: '/Forum',
      name: 'Forum',
      component: () => import('@/views/ForumView.vue')
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: () => import('@/views/ShopView.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/views/UserHome.vue')
    },
    {
      path: '/News',
      name: 'News',
      component: () => import('@/views/NewsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutUser.vue')
    },
    {
      path: '/news/:id',
      name: 'NewsDetail',
      component: () => import('@/views/NewsDetail.vue'),
      props: true
    },
    {
      path: '/device/:id',
      name: 'DeviceDetail',
      component: () => import('@/views/DeviceDetail.vue'),
      props: true
    },
    {
      path: '/to-buy/:id',
      name: 'to-buy',
      component: () => import('@/views/ToBuy.vue'),
      props: true
    },
    {
      path: '/upload-device',
      name: 'upload-device',
      component: () => import('@/views/UploadDevice.vue')
    },
    {
      path: "/Admin",
      name: 'Admin',
      component: () => import('@/admin/MainLayout.vue'),
      children: [
        {
          path: "",
          name: "admin-main",
          component: () => import('@/admin/Main.vue')
        },
        {
          path: "user",
          name: "admin-user",
          component: () => import('@/admin/User.vue')
        },
        {
          path: "articleList",
          name: "admin-articleList",
          component: () => import('@/admin/article/ArticleList.vue')
        },
        {
          path: "test",
          name: "admin-test",
          component: () => import('@/admin/Test.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (store.auth.user != null && to.name && to.name.startsWith('welcome-')) {
    next('/index')
  } else if (store.auth.user == null && to.fullPath.startsWith('/index')) {
    next('/')
  } else {
    next()
  }
})

export default router