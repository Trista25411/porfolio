<script setup lang="ts">
import ProjectCard from '../components/ProjectCard.vue';
import { Project } from '@/data/projectcard';
import LifeCard from '../components/LifeCard.vue';

const getImgUrl = (name: string) => {
  return new URL(`${import.meta.env.BASE_URL}icon/${name}.svg`, import.meta.url).href
};

const skillItems = [
  {
    category: '程式語言',
    items: [
      { icon: 'html', name: 'HTML 5' },
      { icon: 'css', name: 'CSS 3' },
      { icon: 'js', name: 'JavaScript' },
      { icon: 'ts', name: 'TypeScript' },
    ]
  },
  {
    category: '前端框架',
    items: [
      { icon: 'RWD', name: 'RWD' },
      { icon: 'vue', name: 'Vue 3' },
      { icon: 'tailwind', name: 'Tailwind' },
      { icon: 'boostrap', name: 'Boostrap' },
    ]
  },
  {
    category: '設計軟體',
    items: [
      { icon: 'figma', name: 'Figma' },
      { icon: 'autocad', name: 'AutoCAD' },
      { icon: 'ps', name: 'Photoshop' },
    ]
  },
  {
    category: '語言能力',
    items: [
      { icon: 'jp', name: 'Japanese' },
      { icon: 'en', name: 'English' },
    ]
  }
];

const progressItems = [
  {
    mark: '階段一',
    items: { name: '原生語法與排版基礎', skill: 'Semantic HTML、CSS Grid/Flexbox、JS30 邏輯鍛鍊', project: '微軟仿切 / JS30' }
  },
  {
    mark: '階段二',
    items: { name: '現代框架與設計系統', skill: 'Figma 設計規範、Vue 3 Composition API、Boostrap', project: '合記 / 少年英雄聯盟 ' }
  },
  {
    mark: '階段三',
    items: { name: '工程化與型別安全', skill: 'TypeScript、API 異步資料處理及 data 備援機制', project: 'Space Tourism / REST API' }
  },
  {
    mark: '階段四',
    items: { name: '環境部署與組件管理', skill: 'Storybook、GitHub Pages 多子目錄部署、路由問題排除', project: '個人作品集網站開發' }
  },
];

// img 打包因路徑關係變化導致找不到產生破圖，vite.config.ts 寫入並修改路徑名稱
const baseUrl = import.meta.env.BASE_URL;
</script>

<template>
  <main class="container">

    <section id="about">
      <div class="intr-area">
        <div class="intr">
          <div class="title">I’m Trista.</div>
          <p class="bigger">網頁切版 | 前端開發 | UI/UX </p>
          <div class="title-main intr-text">
            <p>專精於將 Figma 設計稿精準轉化為具響應式結構的網頁架構。</p>
            <p>具備 CSS 佈局能力（Flexbox/Grid）與 HTML5 語意化觀念，</p>
            <p>運用 TypeScript 與 Vue.js實作前端交互邏輯。</p>
            <p>製作過團隊、多項獨立專案，追求代碼的乾淨與視覺的高還原度。</p>
          </div>
        </div>
        <img :src="`${baseUrl}pic/personal-flower.png`" alt="about-img" class="about-img">
      </div>
      <img :src="`${baseUrl}pic/intr-bg.png`" alt="" class="intr-bg">
    </section>

    <section id="skill">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>技能與專長</span>
      </h2>
      <div class="skill-grid-area">
        <!--                                                                          要同時傳入固定的 class 和動態產生的 class 使用陣列，而不是 {} => {} 是用來判斷狀態 ， [] 這裡因為要放入好幾個項目，所以用陣列來合併-->
        <div v-for="(category, index) in skillItems" :key="category.category" :class="['skill-card', `card-${index}`]">
          <h3>{{ category.category }}</h3>
          <div class="skill-items">
            <div v-for="item in category.items" :key="item.name" class="ts-big items">
              <img :src="getImgUrl(item.icon)" alt="skill-icon">
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="projects">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>專案作品</span>
      </h2>
      <div class="swipe">
        <span>向右滑動</span>
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </div>
      <div class="project-scroll">
        <div class="project-area">
          <RouterLink v-for="project in Project" :key="project.id" :to="`/projects/${project.id}`">
            <ProjectCard :item="project" class="projectcard" />
          </RouterLink>
        </div>
      </div>
    </section>

    <section id="progress">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>技術演進與成長軌跡</span>
      </h2>
      <div class="progress-content">
        <div v-for="(group, index) in progressItems" :key="index" class="progress-area">
          <div class="progress-card">
            <div class="mark">{{ group.mark }}</div>
            <h3>{{ group.items.name }}</h3>
            <p class="progress-skill">{{ group.items.skill }}</p>
            <div class="progress-project">{{ group.items.project }}</div>
          </div>
          <div v-if="index < progressItems.length - 1" class="progress-arrow">→</div>
        </div>
      </div>
    </section>

    <section id="life">
      <img :src="`${baseUrl}pic/bg-pic-2.png`" alt="bg-pic" class="bg-pic">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>生活日常</span>
      </h2>
      <LifeCard />
    </section>
  </main>
</template>

<style scoped>
h2 {
  display: flex;
  align-items: center;
}

.container {
  padding: 30px 80px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  overflow-x: hidden;
  max-width: 100%;
}

#about {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 30px;
}

.intr-area {
  display: grid;
  grid-template-columns: 60% 40%;
  align-items: center;
  justify-content: center;
}

.intr-bg {
  position: absolute;
  width: 80%;
  max-height: 110%;
}

.intr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  z-index: 1;
  padding-bottom: 20px;
}

.intr-text {
  display: flex;
  flex-direction: column;
  line-height: 1.8;
}

.about-img {
  width: 100%;
  border-radius: 20px;
  z-index: 2;
}

.skill-grid-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 每一列高度，第一個第一列、第二個第二列... */
  grid-template-rows: 200px 100px;
  gap: 20px;
  grid-template-areas:
    "card0 card1 card2 card3"
    "card0 card1 card2 .";
  padding-top: 50px;
}

.card-0 {
  grid-area: card0;
  background-image: url('@/assets/pic/bg-1.svg');
}

.card-1 {
  grid-area: card1;
  background-image: url('@/assets/pic/bg-2.svg');
}

.card-2 {
  grid-area: card2;
  background-image: url('@/assets/pic/bg-3.svg');
}

.card-3 {
  grid-area: card3;
  background-image: url('@/assets/pic/bg-4.svg');
}

.skill-card {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.items {
  display: flex;
  gap: 5px;
}

#projects a {
  text-decoration: none;
  color: var(--color-text);
}

.swipe {
  display: flex;
  align-items: center;
  justify-content: end;
}

.project-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 120px 40px;
}

.project-scroll::-webkit-scrollbar {
  display: none;
}

.project-area {
  width: 800px;
  display: grid;
  /* 向右排列 */
  grid-auto-flow: column;
  gap: 40px;
}

.project-area> :nth-child(3n+2) {
  transform: translateY(100px);
}

.project-area> :nth-child(3n+3) {
  transform: translateY(-80px);
}

.project-area>:nth-child(3n+1):hover {
  transform: translateY(-10px);
}

.project-area> :nth-child(3n+2):hover {
  transform: translateY(80px);
}

.project-area> :nth-child(3n+3):hover {
  transform: translateY(-110px);
}

.projectcard {
  scroll-snap-align: start;
}

#progress {
  margin: -30px 0 20px;
  width: 100%;
}

.progress-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 30px;
}

.progress-area {
  flex: 1;
  display: flex;
  /* 給箭頭定位 */
  position: relative;
  margin-top: 60px;
}

.progress-card {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 25px 20px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.mark {
  background-color: var(--tech-yellow);
  margin-top: -40px;
  padding: 10px 20px;
  border-radius: 10px;
  flex-shrink: 0;
}

.progress-project {
  background-color: rgba(0, 50, 50, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
  flex-shrink: 0;
}

.progress-arrow {
  position: absolute;
  right: -23px;
  top: 50%;
  transform: translateY(-10px);
}

#life {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 80px;
  position: relative;
  padding-top: 50px;
}

.bg-pic {
  position: absolute;
  top: -40px;
  /* 根據視覺微調向上移動的距離 */
  right: 0;
  width: 40%;
  z-index: -1;
  /* 墊在文字下面 */
}

@media (max-width:1500px) {

  .intr-area {
    grid-template-columns: 60% 35%;
  }
}

@media (max-width:1300px) {
  .container {
    padding: 30px 50px;
  }

  .progress-content {
    flex-direction: column;
    padding: 0 50px;
  }

  .progress-arrow {
    right: auto;
    top: auto;
    left: 50%;
    bottom: -40px;
    transform: translateX(-50%) rotate(90deg);
  }
}

@media (max-width:1000px) {
  .container {
    padding: 30px;
    gap: 50px;
  }

  .intr-area {
    grid-template-columns: 1fr;
    width: 90%;
  }

  .intr {
    gap: 10px;
    align-items: center;
  }

  .intr-text {
    align-items: center;
  }

  .about-img {
    width: 40%;
    justify-self: center;
    order: -1;
  }

  .skill-grid-area {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px;
    grid-template-areas:
      "card0 card2" "card1 card3";
  }
}

@media (max-width:550px) {
  .about-img {
    width: 50%;
  }

  .intr-text {
    display: inline;
  }

  .progress {
    width: 250px;
  }
}

@media (max-width:500px) {

  .skill-grid-area {
    grid-template-columns: 1fr;
    grid-template-rows: 200px 200px 180px 150px;
    grid-template-areas:
      "card0" "card1" "card2" "card3"
    ;
  }
}
</style>
