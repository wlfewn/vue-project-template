import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import enUS from './en-US';
import zhCN from './zh-CN';

const messages = {
  en: enUS,
  zh: zhCN
}

// 创建vue-i18n实例
const i18n = new VueI18n({
  locale: 'zh',
  message: messages
});

export default i18n;
