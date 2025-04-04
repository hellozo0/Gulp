import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import MyPage from '../pages/MyPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //📌 페이지 추가될때 마다 이곳에 라우터연결 해주세요!
    //📌 export default를 통해 pages/components들의 컴포넌트명 지정해주는거 잊지 말아주세요!
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
  ],
});

export default router;
