import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import APP from './APP'
import i18n from '@/i18n';

// 插件处理 --------------------------------------------------------------
import { HttpSetting, EventSetting } from '@/assest/common/system-config';
import http from '@/plugins/plugin-http';
import event from '@/plugins/plugin-event';

// 挂载到vue全局属性
Vue.prototype[HttpSetting.namespace] = http;
Vue.prototype[EventSetting.namespace] = event;

// vue 入口实例
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { APP },
  template: '<APP />',
  mounted() {
    // 进行事件监听
    // event.on('routerBeforeEach', function() {
    //   console.log(111111);
    // });

    // event.on('routerAfterEach', function() {
    //   console.log(222222);
    // });

    // event.on('invalid_token', function() {
    //   console.log(333333);
    // });
  }
})
