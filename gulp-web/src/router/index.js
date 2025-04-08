import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import History from '@/pages/History.vue';
import Loan from '@/pages/Loan.vue';
import Login from '@/pages/Login.vue';
import SignUp from '@/pages/SignUp.vue';
import MyPage from '../pages/MyPage.vue';
import MyPageEdit from '@/pages/MyPageEdit.vue';
import Landing from '@/pages/Landing.vue';

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
      path: '/history',
      name: 'history',
      component: History,
    },
    {
      path: '/loan',
      name: 'loan',
      component: Loan,
    },
    {
      path: '/landing',
      name: 'lading',
      component: Landing,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
    {
      path: '/mypage/edit/:id',
      name: 'mypageEdit',
      component: MyPageEdit,
    },
  ],
});

export default router;
