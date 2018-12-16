
# 说明

1. 这是一个vue的基础项目，与现在的element-UI之类的开源项目无关，可以根据实际情况自己选择
    | 序号 | 功能 |
    |----|----|
    | 1 | webpack4.0、babel 7.0 |
    | 2 | 可以外部引用脚本的，使用cdn加速，具体查看index.html |
    | 3 | 封装常用插件，按需引用,具体查看下面的插件说明 |
    | 4 | vue-i18国际化 |
    | 5 | 项目内统一的参数配置，查看 /src/assest/common/system-config.js|
    | 6 | http请求支持是否启用携带token，查看项目内统一的参数配置 |
    | 6 | 使用事件进行解耦，保持最大的灵活性。比如vue-router的路由拦截，可以按照自己意愿配置 |

## 过程记录

1. 这是vue webpack4项目，改造自 https://github.com/naihe138/nvue
2. node-sass
    3.1 node-sass安装很麻烦，需要python2.7、c++编译工具等

    3.2 简单使用 https://www.w3cplus.com/css/an-introduction-to-less-and-comparison-to-sass.html]

3. vue组件懒加载 https://www.cnblogs.com/zhanyishu/p/6587571.html
4. 与移动端适配时，可以使用px2rem-loader 参考 https://www.npmjs.com/package/px2rem-loader
5. webpack 使用svg http://www.cnblogs.com/teemor/p/9565841.html
6. vuex 刷新后数据会丢失，需要使用缓存技术 https://segmentfault.com/q/1010000009577079?_ea=1984886
7. 使用工具更新package.json中依赖包版本到最新版本 https://blog.csdn.net/qq_35624642/article/details/79419802
8. babel 6.x升级到7.x https://www.jianshu.com/p/e21d19875fbb
9. vue-bus使用 https://www.npmjs.com/package/vue-bus
10. vue-i18n 国际化 http://kazupon.github.io/vue-i18n/

## 补充

1. 使用vue-bus进行全局的事件处理

    | 事件名| 说明 |
    |------ |-----|
    | invalid_token| token无效 |
    | routerBeforeEach | 路由跳转前事件 |
    | routerAfterEach | 路由跳转后事件 |

2. http ajax请求的参数配置，查看/src/assest/common/system-config.js 的httpSetting
3. 简单封装axios，查看/src/plugins/plugin-http.js
4. 简单封装html5的storage，查看/src/assest/common/utils/util-storage.js

## 插件

1. 自定义插件所在目录 —— /src/plugins
   | 插件名 | 说明 |
   | ------ | ---- |
   | plugin-event | 可全局使用的事件插件, 封装vue-bus |
   | plugin-http  | http请求插件，简单封装axios |
   | plugin-router | vue-router操作相关插件，提供导航前后事件通知等功能 |

## 项目结构

```txt
  src
    | -- assest 一般存放js脚本
      | -- common
        | -- utils
          | -- util-storage.js 封装html5的缓存操作工具类
      | -- system-config.js 项目内的系统参数配置
    | -- components 通用组件
    | -- i18n vue-i18n 国际化配置
    | -- pages vue 页面组件
    | -- plugins 必须统一使用的文件(约定由于配置)
      | -- plugin-event.js 封装vue-bus的全局事件操作
      | -- plugin-http.js 封装axios
      | -- plugin-router.js 封装vue-router
    | -- router vue-router配置
    | -- store vuex配置
    | -- main.js -- 项目入口文件  
  static
    | -- js 无法使用cdn加速，但可以使用webpack外部引用的js脚本  
```