import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/service1/upload'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { public: true }
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '/service1/upload',
        name: 'service1-upload',
        component: () => import('@/views/service1/UploadView.vue')
      },
      {
        path: '/service1/analysis/:jobId',
        name: 'service1-analysis',
        component: () => import('@/views/service1/AnalysisView.vue'),
        props: true
      },
      {
        path: '/service1/results/:jobId',
        name: 'service1-results',
        component: () => import('@/views/service1/ResultsView.vue'),
        props: true
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (to.meta.public && auth.isAuthenticated) {
    return { name: 'service1-upload' };
  }
  return true;
});

export default router;
