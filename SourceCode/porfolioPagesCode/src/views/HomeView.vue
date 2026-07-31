<script setup lang="ts">
import ProjectCard from '../components/ProjectCard.vue';
import { Project } from '@/data/projects';
import LifeCard from '../components/LifeCard.vue';

const baseUrl = import.meta.env.BASE_URL;
const getImgUrl = (name: string) => {
  return `${baseUrl}icon/${name}.svg`;
};

const aboutItems = [
  {
    name: '前端架構',
    items: '以 Vue 3 為主進行模組化，並搭配 TypeScript 開發，重視程式碼的重用性與可維護性。',
  },
  {
    name: 'UI/UX 設計還原',
    items: '還原 Figma 規劃，具備 RWD 網頁架構，並優化行動端效能（ CLS 畫面跳動）。',
  },
  {
    name: '整合與自動化部署',
    items: '實作 RESTful API 串接、Git 流程控制、Storybook 元件測試與 GitHub Actions CI/CD 流程。',
  },
  {
    name: 'AI 協同',
    items: '善用 AI 工具進行語法排查、架構優化與技術文件導讀。',
  },
]

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
      { icon: 'bootstrap', name: 'Bootstrap' },
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
    items: { name: '現代框架與設計系統', skill: 'Figma 設計規範、Vue 3 Composition API、Bootstrap', project: '合記 / 少年英雄聯盟 ' }
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
</script>

<template>
  <main class="container">

    <section id="my">
      <div class="intr-area">
        <div class="intr">
          <div class="title">I’m Trista.</div>
          <p class="title-main">「用設計思維規劃流程，用現代前端技術實踐體驗。」 </p>
          <div class="title-main intr-text">
            <p>我是林蕙歆，擁有JLPT N2 認證與多元跨界背景的前端工程師。</p>
            <p>對新技術充滿好奇，具執行力的跨界學習者。</p>
            <p>運用不同工具完成網頁專案與 API 串接的實作經驗。</p>
          </div>
        </div>
        <img :src="`${baseUrl}pic/personal.png`" alt="about-img" class="about-img">
      </div>
      <img :src="`${baseUrl}pic/intr-bg.png`" alt="" class="intr-bg">
    </section>

    <section id="projects">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>專案作品 Featured Projects</span>
      </h2>
      <div class="swipe">
        <span>電腦版請點一下這區塊空白處後長按>鍵 / 手機平板請向右滑動</span>
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
    <hr>

    <section id="about">
      <div class="area-text ts">
        <h2>
          <ion-icon name="chevron-forward-outline"></ion-icon>
          <span>關於我 About Me</span>
        </h2>
        <div>
          <p>過去在電子業與家具業的工作經驗中，體會到實用又美觀的系統對使用者的重要性。</p>
          <p>擁有UI/UX設計思維與前端製作概念，於團隊中擔任視覺設計與程式製作間的溝通橋樑。</p>
        </div>
      </div>
      <div>
        <div class="about-grid-area">
          <div v-for="item in aboutItems" class="about-items">
            <div class="ts-big about-name">{{ item.name }}</div>
            <div>{{ item.items }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="skill">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>技能與專長 Skill & Expertise</span>
      </h2>
      <div class="skill-grid-area">
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



    <section id="progress">
      <h2>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>技術演進與成長軌跡 Growth Timeline</span>
      </h2>
      <div class="progress-content">
        <div v-for="(group, index) in progressItems" :key="index" class="progress-area">
          <div class="progress-card">
            <div class="mark">{{ group.mark }}</div>
            <h3>{{ group.items.name }}</h3>
            <p>{{ group.items.skill }}</p>
            <div class="progress-project">{{ group.items.project }}</div>
          </div>
          <div v-if="index < progressItems.length - 1" class="progress-arrow">→</div>
        </div>
      </div>
    </section>

    <section id="life">
      <img :src="`${baseUrl}pic/bg-pic-2.png`" alt="bg-pic" class="bg-pic">
      <div class="area-text ts">
        <h2>
          <ion-icon name="chevron-forward-outline"></ion-icon>
          <span>生活日常 Journal</span>
        </h2>
        <div>圖片採隨機排序顯示、延遲載入優化效能，並修正 iOS Safari 色彩空間顯示偏色問題</div>
      </div>
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

#my {
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
  gap: 30px;
  z-index: 1;
}

.intr-text {
  display: flex;
  flex-direction: column;
  line-height: 2;
}

.about-img {
  width: 90%;
  border-radius: 20px;
  z-index: 2;
  padding-top: 20px;
}

#about {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.about-grid-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.about-items {
  background-color: #FFFBF5;
  border-radius: 20px;
  padding: 30px;
}

.about-name {
  color: #F55C2D;
}

.skill-grid-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  right: 0;
  width: 40%;
  z-index: -1;
}

.area-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
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
    width: 50%;
    justify-self: center;
    order: -1;
    padding-top: 0;
    padding-left: 80px;
  }

  .about-grid-area {
    grid-template-columns: 2fr 2fr;
  }

  .skill-grid-area {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 200px 200px;
    grid-template-areas:
      "card0 card2" "card1 card3";
  }
}

@media (max-width:800px) {
  .about-img {
    width: 60%;
    padding-left: 50px;
  }
}

@media (max-width:550px) {
  .about-img {
    width: 80%;
  }

  .intr-text {
    display: inline;
  }

  .about-grid-area {
    grid-template-columns: 1fr;
  }

  .progress {
    width: 250px;
  }

  .progress-content {
    grid-template-columns: 1fr;
  }

  .progress-arrow {
    right: auto;
    top: auto;
    left: 50%;
    bottom: -40px;
    transform: translateX(-50%) rotate(90deg);
  }
}

@media (max-width:500px) {
  .skill-grid-area {
    grid-template-columns: 1fr;
    grid-template-rows: 200px 200px 180px 150px;
    grid-template-areas:
      "card0" "card1" "card2" "card3";
  }
}
</style>
