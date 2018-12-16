/**
 * html5 localStorage 或sessionStrage工具类
 */
// 获取命名空间
import { StorageSetting } from '@/assest/common/system-config';

// 使用Symbol定义私有方法 https://blog.csdn.net/hsl0530hsl/article/details/79769205

class Storage {

  constructor(name) {
    this.storage = window[name];
  }

  // private methods -------------------------------------------------------
  /**
   * 私有函数，对缓存取出的数据进行json格式化
   */
  getContent() {
    const findStorage = this.storage.getItem(StorageSetting.namespace);
    if (findStorage) {
      return JSON.parse(findStorage);
    }
    return {}
  }

  // public methods --------------------------------------------------------
  /**
   * 读取数据
   * @param {String} key 
   */
  getItem(key) {
    let content = this.getContent();
    return content[key] || '';
  }

  /**
   * 保存数据
   * @param {String} key 
   * @param {Object} value 
   */
  setItem(key, value) {
    let content = this.getContent();
    content[key] = value;
    // 存入缓存
    this.storage.setItem(StorageSetting.namespace, JSON.stringify(content));
  }

  /**
   * 删除指定键的数据
   * @param {String} key 
   */
  removeItem(key) {
    this.storage.removeItem(key);
  }

  /**
   * 清除所有数据
   */
  clear() {
    this.storage.clear();
  }
}

const localStorage = new Storage('localStorage');
const sessionStorage = new Storage('sessionStorage');

export {
  localStorage as default,
  sessionStorage
}
