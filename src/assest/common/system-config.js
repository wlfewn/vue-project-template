/**
 * 系统基础配置
 */

/**
 * http 部分配置
 */
export const HttpSetting = {
  namespace: '$http',           // Vue全局http命名
  baseURL: 'api',               // api请求的默认前缀
  timeout: 5000,                // 请求超时时间
  // 与token 有关部分
  enableToken: true,            // http请求是否携带token
  tokenHeader: 'Authorization', // toekn 请求头变量
  tokenBearer: 'Bearer',        // token 前缀
}

/**
 * html5 storage 配置
 */
export const StorageSetting = {
  // 存储缓存根命名
  namespace: 'geng',
  // 缓存中token key
  tokenName: 'token'
}

/**
 * vue router配置
 */
export const RouterSetting = {
  // 路由拦截白名单,不需要登录部分
  whitelist: ['login'],
  // vue 页面组件存放位置
  pages: 'pages'
}

/**
 * 消息插件配置
 */
export const EventSetting = {
  // 全局事件命名
  namespace: '$event'
}
