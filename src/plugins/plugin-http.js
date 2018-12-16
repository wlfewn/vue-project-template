/**
 * 封装axios 的http请求
 * 参考 https://github.com/zaofeng/just_for_base/blob/master/vue/main.js
 * https://www.npmjs.com/package/axios
 */
import axios from 'axios'
import { HttpSetting, StorageSetting } from '@/assest/common/system-config';
import localStorageUtil from '@/assest/common/utils/util-storage';
import event from '@/plugins/plugin-event';

// 客户自定义异常
const responseStatus = {
  /** token 禁止访问 */
  FORBIDDEN_TOKEN: 403,
  /** token 无效 */
  INVALID_TOKEN: 401
}

// 需要使用该插件时，使用Vue.use()进行注册
export default function http() {

  // 默认设置
  axios.defaults.baseURL = HttpSetting.baseURL
  // 设置默认请求头
  // axios.defaults.headers = {
  //   'X-Requested-With': 'XMLHttpRequest'
  // }
  // 设置请求过时时间
  axios.defaults.timeout = HttpSetting.timeout

  // 添加请求拦截器
  axios.interceptors.request.use((config) => {
    if (HttpSetting.enableToken) {
      // 获取用户token
      const token = localStorageUtil.getItem(StorageSetting.tokenName);
      if (token) {
        config.headers[HttpSetting.tokenHeader] = `${HttpSetting.tokenBearer} ${token}` // 模板语法
      }
    }
    return config // 返回配置信息
  }, (error) => {
    // 对请求错误做些什么
    console.error('invalid config', error)
    return Promise.reject(error)
  });

  // 响应拦截器
  axios.interceptors.response.use((res) => {
    // 对响应状态处理
    if (res.status !== 200) {
      return Promise.reject(res.data)
    }
    // console.log('axios response data', res.data)
    return res.data
  }, (error) => {
    console.error('axios error response', error)
    if (error.response) {
      switch (error.response.status) {
        // 如果token 过期，提醒用户重新登陆
        case responseStatus.INVALID_TOKEN:
          // 使用事件解耦 
          if (event) {
            event.emit('invalid_token');
          }
      }
    }
    return Promise.reject(error.data)
  })

  return {
    /**
     * 自定义的ajax请求
     * @param {Object} config 
     */
    ajax(config = {}) {
      return axios(config)
    },

    /**
     * http get请求
     * @param {String} url 
     * @param {Object} param 
     */
    get (url, param) {
      return this.ajax({
        method: 'get',
        url: url,
        params: param
      })
    },

    /**
     * post请求
     * @param {String} url 
     * @param {Object} param 
     */
    post (url, param) {
      return this.ajax({
        method: 'post',
        url: url,
        data: param
      })
    },

    /**
     * http post 请求, 发送对象
     * @param {String} url 
     * @param {Object} param 
     */
    postJson (url, param) {
      return this.ajax({
        method: 'post',
        url: url,
        data: param,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
};
