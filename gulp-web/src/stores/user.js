import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userId: null, // DB상의 PK
    id: '', //user 로그인 id
    nickname: '', // 닉네임
    email: '', // 이메일 등 추가 정보
  }),
  actions: {
    loadUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.id = userData.id;
        this.userId = userData.userId;
        this.nickname = userData.nickname;
        this.email = userData.email;
        this.isLoggedIn = true;
      }
    },
    login(userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      this.id = userData.id;
      this.userId = userData.userId;
      this.nickname = userData.nickname;
      this.email = userData.email;
      this.isLoggedIn = true;
    },
    logout() {
      localStorage.removeItem('user');
      this.userId = null;
      this.id = '';
      this.nickname = '';
      this.email = '';
      this.isLoggedIn = false;
    },
  },
});
