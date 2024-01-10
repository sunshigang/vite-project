/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_BASE_URL: string
  // 更多环境变量...
}
declare module "element-plus/dist/locale/zh-cn.mjs"
interface ImportMeta {
  readonly env: ImportMetaEnv
}