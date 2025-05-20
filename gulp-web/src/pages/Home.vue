<template>
  <div class="container-fluid">
    <div style="display: flex">
      <!-- 월 선택 -->
      <div class="month-selector">
        <select v-model="selectedMonth" id="month">
          <option v-for="month in availableMonths" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
      <!--목차 스크롤-->
      <select @change="scrollToSectionHandler" class="section-selector">
        <option value="">소비 통계</option>
        <option value="지출별">지출별</option>
        <option value="순이익">순이익</option>
        <option value="최신순">최신순</option>
        <option value="감정별">감정별</option>
      </select>
    </div>
    <!-- <div class="flexbox-container"> -->
    <div>
      <!-- 지출별 -->
      <h2 id="지출별" style="font-weight: bold">지출 상위 4개 항목</h2>
      <div class="bySpending">
        <BySpending :selectedMonth="selectedMonth" />
      </div>
      <!-- <br /> -->
      <div class="right-column">
        <!-- 순이익 -->
        <h2 id="순이익" style="font-weight: bold">이번달은 얼마 남았을까요?</h2>
        <div class="netProfit">
          <NetProfit :selectedMonth="selectedMonth" />
        </div>
        <!-- 최신순 -->
        <h2 id="최신순" style="font-weight: bold">내역 최신순 조회</h2>
        <div class="sortByLatest">
          <SortByLatest :selectedMonth="selectedMonth" />
        </div>
      </div>
    </div>
    <!-- 감정별 -->
    <h2 id="감정별" style="font-weight: bold">감정 소비 통계</h2>
    <div class="byEmotion">
      <ByEmotion :selectedMonth="selectedMonth" />
    </div>
    <!-- 퀵 생성 버튼 추가 -->
    <div class="create-container">
      <QuickButton @togglePopup="toggleQuickCreate" />
      <QuickCreate
        :showQuickCreate="showQuickCreate"
        @togglePopup="toggleQuickCreate"
      />
    </div>
    <!-- 맨 위로 버튼 추가 -->
    <button v-show="showTopButton" @click="scrollToTop" class="go-to-top-btn">
      <i class="fa-solid fa-chevron-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import SortByLatest from '@/components/SortByLatest.vue';
import ByEmotion from '@/components/ByEmotion.vue';
import NetProfit from '@/components/NetProfit.vue';
import BySpending from '@/components/BySpending.vue';
import QuickButton from '@/components/QuickButton.vue';
import QuickCreate from '@/components/QuickCreate.vue';

const showQuickCreate = ref(false); // 팝업 상태
const toggleQuickCreate = () => {
  showQuickCreate.value = !showQuickCreate.value;
};

const budgetData = ref([]);
const availableMonths = ref([]);
const selectedMonth = ref('');

// 월 목록 가져오기
onMounted(async () => {
  const res = await axios.get('http://localhost:3000/budget');
  budgetData.value = res.data;
  // Date data에서 yyyy-MM만 추출 + set : 중복 제거
  const months = [...new Set(res.data.map((item) => item.date.slice(0, 7)))];
  availableMonths.value = months.sort((a, b) => new Date(b) - new Date(a));
  // selectedMonth : 가장 최신 월로 설정
  selectedMonth.value = availableMonths.value[0];
});

// 목차 스크롤
function scrollToSectionHandler(event) {
  const id = event.target.value;
  if (id) {
    const el = document.getElementById(id);
    if (el) {
      // 먼저 스크롤
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 약간 delay 후 약간 위로 조정 (예: 80px 위로)
      setTimeout(() => {
        window.scrollBy({ top: -100, behavior: 'smooth' });
      }, 450);
    }
  }
}

// 맨 위로 가기 버튼

const showTopButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showTopButton.value = window.scrollY > 300; // 300px 이상 스크롤 시 표시
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<!-- <script>
import SortByLatest from '@/components/SortByLatest.vue';
import ByEmotion from '@/components/ByEmotion.vue';
import NetProfit from '@/components/NetProfit.vue';
import BySpending from '@/components/BySpending.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { SortByLatest, ByEmotion, NetProfit, BySpending },
  data() {
    return {
      budgetData: [],
      availableMonths: [],
      selectedMonth: '',
    };
  },
  async mounted() {
    const res = await axios.get('http://localhost:3000/budget');
    this.budgetData = res.data;
    const months = [...new Set(res.data.map((item) => item.date.slice(0, 7)))];
    this.availableMonths = months.sort((a, b) => new Date(b) - new Date(a));
    this.selectedMonth = this.availableMonths[0];
  },
};
</script> -->

<style scoped>
/* index */
/* .index_bySpending {
font-weight: ;
} */

/* 맨 위로 가기 버튼 */
.go-to-top-btn {
  border-radius: 50%;
  padding: 20px;
  width: 5.5rem;
  height: 5.5rem;
  background-color: #f8dd26;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 200px;
  right: 110px;
  z-index: 2000;
}

.go-to-top-btn:hover {
  transform: scale(0.9); /* 클릭 시 크기 10% 줄어드는 효과 */
}

.go-to-top-btn:active {
  transform: scale(0.8); /* 클릭 시 좀 더 줄어들게 설정 */
}

.section-selector {
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.month-selector {
  margin-bottom: 1rem;
  font-size: 1.4rem;
}
select {
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  opacity: 90%;
  width: 7.7rem;
  /* background-color: #fae55f; */
}
select:hover {
  background-color: #fae55f;
}
select option {
  font-size: 0.8rem;
  padding: 2px 4px;
}
</style>

<style scoped>
* {
  font-family: sans-serif;
}
.container-fluid {
  width: 95%;
  max-width: none;
  min-height: 100vh;
  margin: 0 auto;
}

.flexbox-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: stretch;
  flex-wrap: wrap;
}

/* 왼쪽 박스 */
.bySpending {
  background-color: white;
  min-height: 100px;
  max-height: 100%;
  max-width: 100%;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  flex: 1;
  padding: 3rem;
  min-width: 200px;
}

/* 오른쪽 컬럼 */
.right-column {
  display: flex;
  min-height: 100px;
  max-height: 100%;
  max-width: 100%;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
}

.byEmotion {
  background-color: #fff;
  /* padding: 2rem; */
  width: 100%;
  height: 10rem;

  padding: 3rem;

  height: 300px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
/* 박스 스타일 공통 */
.netProfit,
.sortByLatest {
  background-color: #fae55f;
  /* opacity: 60%; */
  padding: 3rem;

  /* padding: 12rem 8rem; */
  min-height: 200px;
  border-radius: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* 감정 영역 */
.byEmotion {
  width: 100%;
  height: 200%;
}

.create-container {
  position: fixed;
  bottom: 50px;
  right: 100px;
  z-index: 1000;
}
</style>
