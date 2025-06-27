<template>
  <div id="container" ref="containerEl" @click="toggleRotation">
    <video ref="videoEl" autoplay muted playsinline></video>
    <button id="resetButton" @click.stop="resetRotation">회전 초기화</button>
    <button id="captureButton" @click.stop="capturePhoto">📸 사진 촬영</button>
    <button
      id="switchCameraButton"
      v-show="isMobile"
      @click.stop="toggleCamera"
    >
      🔄 카메라 전환
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Refs
const videoEl = ref(null);
const containerEl = ref(null);

// 반응형 모바일 판단
const userAgentIsMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => userAgentIsMobile || windowWidth.value <= 768);

// 상태
const currentFacing = ref('environment');
const rotating = ref(false);

let stream = null;
let renderer, scene, camera, model;
let lastTime = 0;
const speed = 2.5;

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

// 카메라 설정
async function setupCamera(facingMode) {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  try {
    const constraints = {
      video: isMobile.value ? { facingMode: { exact: facingMode } } : true,
      audio: false,
    };
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoEl.value) {
      videoEl.value.srcObject = stream;
    }
    currentFacing.value = facingMode;
  } catch (err) {
    console.error('카메라 연결 실패:', err);
    alert('카메라를 시작할 수 없습니다. 권한을 확인해주세요.');
  }
}

function toggleCamera() {
  const nextFacing = currentFacing.value === 'user' ? 'environment' : 'user';
  setupCamera(nextFacing);
}

// Three.js 초기화
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
  containerEl.value.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 1, 2).normalize();
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load(
    '/honey.glb',
    (gltf) => {
      model = gltf.scene;
      model.position.set(0, 0.5, 0);
      const scaleFactor = isMobile.value ? 0.35 : 0.5;
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      scene.add(model);
    },
    undefined,
    (err) => console.error('모델 로드 실패:', err)
  );

  animate();
}

// 반응형 캐릭터 크기 조절
watch(isMobile, (val) => {
  if (model) {
    const scaleFactor = val ? 0.35 : 0.5;
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }
});

function animate(time) {
  requestAnimationFrame(animate);
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  if (model && rotating.value) {
    model.rotation.y += delta * speed;
  }
  renderer.render(scene, camera);
}

function toggleRotation() {
  rotating.value = !rotating.value;
}

function resetRotation() {
  if (model) model.rotation.y = 0;
}

function capturePhoto() {
  if (!renderer || !videoEl.value) return;
  const baseWidth = renderer.domElement.width;
  const baseHeight = renderer.domElement.height;
  const scale = isMobile.value ? 0.6 : 1;
  const width = baseWidth * scale;
  const height = baseHeight * scale;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoEl.value, 0, 0, width, height);
  ctx.drawImage(renderer.domElement, 0, 0, width, height);
  const name = `꼴깍_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = name;
  link.click();
}

function handleResize() {
  updateWindowWidth();
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

onMounted(() => {
  setupCamera(currentFacing.value);
  initThree();
  window.addEventListener('resize', handleResize);
  window.addEventListener('resize', updateWindowWidth);
});

onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('resize', updateWindowWidth);
  if (renderer) renderer.dispose();
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

#container > canvas {
  display: block;
}

button {
  position: absolute;
  z-index: 10;
  padding: 10px 7px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

#resetButton {
  bottom: 20px;
  left: 10px;
}

#captureButton {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

#switchCameraButton {
  bottom: 20px;
  right: 10px;
}

@media (min-width: 768px) {
  button {
    font-size: 18px;
    padding: 14px 20px;
  }
}
</style>
