import RouterPlugin from '@/plugins/plugin-router';

// 系统基本路由
import SysRouters from '@/router/router-sys';

const routes = SysRouters;

const routerConfig = {
  mode: 'history',
  routes: routes
}

export default RouterPlugin.createRouter(routerConfig);
