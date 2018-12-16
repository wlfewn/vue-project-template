/**
 * 事件插件
 */
import Vue from 'vue';
import VueBus from 'vue-bus';

Vue.use(VueBus);

/**
 * 封装统一的消息事件,其他地方使用该插件, 避免以后替换消息插件时需要改动很多地方
 */
export default {
  on(eventName, handler) {
    Vue.bus.on(eventName, handler);
  },
  once(eventName, handler) {
    Vue.bus.once(eventName, handler);
  },
  off(eventName, handler) {
    Vue.bus.off(eventName, handler);
  },
  emit(eventName, ...args) {
    Vue.bus.emit(eventName, ...args);
  }
}
