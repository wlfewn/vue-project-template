<!--
  * 使用vue render动态加载 js 代码
  * 注意： 使用render时不能有template
  * 参考： https://segmentfault.com/q/1010000016677825
-->

<script>
export default {
  name: 'v-script',

  props: {
    src: {
      type: String,
      required: true
    }
  },

  render(createElement) {
    return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
  }
}
</script>
