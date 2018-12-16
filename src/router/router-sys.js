import RouterPlugin from '@/plugins/plugin-router';

export default [
  RouterPlugin.createLazyRoute('/login', '/common/login.vue')
]
