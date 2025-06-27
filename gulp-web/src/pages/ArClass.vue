<template>
  <div id="container">
    <video ref="video" autoplay muted playsinline></video>
    <button id="analyzeButton" @click="analyzeText">🔍 해석</button>
    <button id="switchCameraButton" v-if="isMobile" @click="toggleCamera">
      🔄 카메라 전환
    </button>
    <div id="speechBubble" v-show="showBubble">{{ explanation }}</div>
    <div id="loadingText" v-show="isLoading">해석 중입니다...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Tesseract from 'tesseract.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const video = ref(null);
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const currentFacing = ref('environment');
const stream = ref(null);
const showBubble = ref(false);
const isLoading = ref(false);
const explanation = ref('');
let renderer, camera, scene, model;

const glossary = {
  대출: '이자를 조건으로 돈을 빌려주는 행위야! 내가 돈을 주면 너는 더 많은 돈을 나한테 돌려줘야 하는거야',
  이자: '돈을 빌린 대가로 추가로 내는 돈이에요!',
  '대출 방식': '담보 대출과 신용 대출이 있어',
  '담보 대출':
    '너가 돈을 못 갚으면 너의 소중한 물건을 내가 가지는 거야! 어떤 물건을 주고 싶어? 물론 갚으면 주지 않아도 좋아',
  '신용 대출':
    '너를 믿고 돈을 빌려주는 거야. 너가 꾸준히 돈을 벌고 있다면 신청 가능할 확률이 높아!!',
  만기일시상환:
    '매년 이자만 내다가, 마지막에 한 번에 원금과 이자를 모두 갚는 방식이야!',
  원금균등상환:
    '처음에 많이 내고 점점 적게 내는 방식이야. 돈은 적게 내지만 초반 부담이 클걸.',
  원리금균등상환:
    '매달 비슷한 금액을 갚아서 계산이 쉬워. 하지만 갚아야 할 돈은 제일 많아',
  금리: '돈을 빌릴 때, 얼마나 더 내야 하는지를 퍼센트(%)로 나타낸 숫자예요. 금리에 따라 갚는 돈이 변해요.',
  '고정 금리': '처음 정한 금리가 끝날 때까지 변하지 않아. 마음이 편안지?',
  '변동 금리':
    '금리가 주기적으로 변해 도박을 좋아하거나 경제 흐름에 자신이 있으면 도전하라구!',
};

async function setupCamera(facingMode = 'user') {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: isMobile ? { facingMode: { exact: facingMode } } : true,
      audio: false,
    });
    video.value.srcObject = stream.value;
    currentFacing.value = facingMode;
  } catch (err) {
    console.error('카메라 연결 실패:', err);
  }
}

function toggleCamera() {
  const nextFacing = currentFacing.value === 'user' ? 'environment' : 'user';
  setupCamera(nextFacing);
}

async function analyzeText() {
  isLoading.value = true;
  try {
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video.value, 0, 0, width, height);

    const {
      data: { text },
    } = await Tesseract.recognize(canvas, 'kor');
    const cleanedText = text.replace(/\s+/g, ' ').trim();
    console.log('인식된 텍스트:', cleanedText);

    const foundWord = Object.keys(glossary).find((word) =>
      cleanedText.includes(word)
    );
    if (foundWord) {
      explanation.value = glossary[foundWord];
      showBubble.value = true;

      const utterance = new SpeechSynthesisUtterance(explanation.value);
      utterance.lang = 'ko-KR';
      utterance.pitch = 1.8;
      utterance.rate = 1.2;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);

      setTimeout(() => {
        showBubble.value = false;
      }, 10000);
    } else {
      alert('설명할 단어를 찾지 못했어요.');
    }
  } catch (err) {
    console.error('OCR 에러:', err);
    alert('해석 중 문제가 발생했어요.');
  } finally {
    isLoading.value = false;
  }
}

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 1, 2).normalize();
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load(
    '/public/honey.glb',
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
      model.position.set(0, 0.5, 0);
      scene.add(model);
    },
    undefined,
    (err) => console.error('모델 로드 실패:', err)
  );

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

onMounted(() => {
  setupCamera(isMobile ? currentFacing.value : 'user');
  initThree();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
});
</script>

<style scoped>
#container {
  margin: 0;
  overflow: hidden;
}
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}
canvas {
  display: block;
}
button {
  position: absolute;
  z-index: 10;
  padding: 10px 16px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
#analyzeButton {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
#switchCameraButton {
  bottom: 20px;
  right: 10px;
}
#speechBubble {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  z-index: 15;
}
#loadingText {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  z-index: 20;
}
button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
