import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import table from '@/ListView.vue';
import FrontPage from '@/FrontPage';
import Article from '@/ArticleDetail';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'FrontPage',
      component: FrontPage,
    },
    {
      path: '/list',
      name: 'List',
      component: table,
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
    },
  ],
});
export default router;