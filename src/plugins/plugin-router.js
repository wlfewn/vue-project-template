// /**
//  * vue router 初始化与拦截配置
//  */
// /**
//  * 检查发送事件对象是否存在
//  * ... 是不定参数写法, 使用一个数组接收参数
//  * @param {Object} eventBus 事件处理对象
//  * @param {String} eventName 发送事件名称
//  * @param {...any} args 事件参数
//  */
// const checkAndEmit = (eventBus, eventName, ...args) => {
//   if (eventBus) {
//     // 把方法名添加到数组的头部
//     args.unshift(eventName);
//     // 使用当前对象发送事件
//     eventBus.emit.apply(eventBus, args);
//   }
// }

// /**
//  * 扩展vue-router, 因为vue-router使用es6的class编写，可以直接使用extends
//  */
// export default class AppRouter extends VueRouter {
  
//   eventBus;
//   authenticationPromise;
  
//   constructor (options = {}, eventBus, authenticationPromise) {
//     super(options);
//     this.eventBus = eventBus;
//     this.authenticationPromise = authenticationPromise;
//   }

//   /**
//    * 实现router.beforeEach的function逻辑，进行router跳转前事件通知
//    * 参考 https://blog.csdn.net/qq673318522/article/details/55506650
//    * https://github.com/superman66/vue-axios-github/blob/master/src/router.js
//    * @param {Function} fn 
//    */
//   beforeEach(fn = (to, from, next) => {
//     // 路由鉴权忽略白名单
//     if (RouterSetting.whitelist.indexOf(to.path)) {
//       checkAndEmit(this.eventBus, 'routerBeforeEach', to, from);
//       next();
//     } else {
//       if (this.authenticationPromise) {     // 实现路由鉴权
//         this.authenticationPromise.then(() => {
//           checkAndEmit(this.eventBus, 'routerBeforeEach', to, from);
//           next();
//         })
//       } else {                              // 没有实现路由鉴权
//         checkAndEmit(this.eventBus, 'routerBeforeEach', to, from);
//         next();
//       }
//     }
//   }) {
//     console.log('beforeEach', fn);
//     super.beforeEach(fn);
//   }
  
//   /**
//    * 实现router.afterEach的function逻辑，进行router跳转后事件通知
//    * @param {Function} fn 
//    */
//   afterEach(fn = (to, from) => {
//     checkAndEmit(this.eventBus, 'routerAfterEach', to, from);
//   }) {
//     console.log('afterEach', fn);
//     super.afterEach(fn);
//   }
// }

// 上面这种写法无法触发beforeEach和afterEach
import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterSetting } from '@/assest/common/system-config';
import Event from '@/plugins/plugin-event';

Vue.use(VueRouter);

export default {
  /**
   * 抽象vue-router的拦截器，进行事件通知，如系统鉴权
   * @param {*} routerConfig vue-router配置
   * @param {*} authenticationPromise 系统鉴权promise操作
   */
  createRouter(routerConfig = {}, authenticationPromise = null) {
    // 创建vue-router实例
    const router = new VueRouter(routerConfig);

    /**
     * 检查发送事件对象是否存在
     * ... 是不定参数写法, 使用一个数组接收参数
     * @param {Object} eventBus 事件处理对象
     * @param {String} eventName 发送事件名称
     * @param {...any} args 事件参数
     */
    const checkAndEmit = (eventName, ...args) => {
      if (Event) {
        // 把方法名添加到数组的头部
        args.unshift(eventName);
        // 使用当前对象发送事件
        Event.emit.apply(Event, args);
      }
    }
  
    router.beforeEach((to, from, next) => {
      // 路由鉴权忽略白名单
      if (RouterSetting.whitelist.indexOf(to.path)) {
        checkAndEmit('routerBeforeEach', to, from);
        next();
      } else {
        if (authenticationPromise) {     // 实现路由鉴权
          authenticationPromise.then(() => {
            checkAndEmit('routerBeforeEach', to, from);
            next();
          })
        } else {                              // 没有实现路由鉴权
          checkAndEmit('routerBeforeEach', to, from);
          next();
        }
      }
    });
  
    router.afterEach((to, from) => {
      // 结束导航条动画
      checkAndEmit('routerAfterEach', to, from);
    })

    return router;
  },

  /**
   * 创建路由信息,应用路由懒加载
   * @param {String} routerPath 匹配路径 
   * @param {String} componentPath 组件文件相对路径
   * @param {Object} meta 元数据
   */
  createLazyRoute(routerPath = '', componentPath, meta = {}) {
    return {
      path: routerPath,
      meta: meta,
      component: function(resolve) {
        require(['@/' + RouterSetting.pages + componentPath], resolve)
      }
    }
  }
}
