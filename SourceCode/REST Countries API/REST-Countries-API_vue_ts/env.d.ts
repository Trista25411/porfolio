/// <reference types="vite/client" />

// 加入這段宣告
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}