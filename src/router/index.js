import { createRouter, createWebHistory } from 'vue-router';
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
      component: () => import('@/views/IndexView.vue'),
      
    },{
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutUser.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const store = useStore();

  // 如果用户已登录且访问的是欢迎页，则重定向到首页
  if (store.auth.user != null && to.name.startsWith('welcome-')) {
    next('/index');
  }
  // 如果用户未登录且访问的是需要登录的页面，则重定向到欢迎页
  else if (store.auth.user == null && to.matched.some(record => record.meta.requiresAuth)) {
    next('/');
  }
  // 如果路由未匹配到任何页面，则重定向到首页
  else if (to.matched.length === 0) {
    next('/index');
  }
  // 其他情况放行
  else {
    next();
  }
});

export default router;
