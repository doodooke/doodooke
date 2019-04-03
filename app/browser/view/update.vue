<template>
  <el-row id="layout">
    <el-row style="text-align:center;padding-top:50px">
      <h2>温馨提示：<strong>您的浏览器需要更新才能访问哦 ^_^</strong></h2>
      <h3>请将浏览器设置成 <strong>极速模式</strong> 或者请使用 <strong>Chrome</strong>、<strong>Safari</strong>、<strong>Firefox</strong>、<strong>Opera</strong>、<strong>Edge</strong>
        浏览器访问~</h3>
      <p style="padding:50px 0">
        <a
          href="http://www.google.com/chrome"
          target="_blank"
        ><img
            src="../www/Chrome.png"
            alt="Chrome"
          ></a>
        <a
          href="http://www.apple.com/safari"
          target="_blank"
        ><img
            src="../www/Safari.png"
            alt="Safari"
          ></a>
        <a
          href="http://www.firefox.com/"
          target="_blank"
        ><img
            src="../www/Firefox.png"
            alt="Firefox"
          ></a>
        <a
          href="http://www.opera.com/"
          target="_blank"
        ><img
            src="../www/Opera.png"
            alt="Opera"
          ></a>
        <a
          href="http://www.microsoft.com/zh-cn/download/default.aspx"
          target="_blank"
        ><img
            src="../www/Edge.png"
            alt="IE->Edge"
          ></a>
      </p>
    </el-row>

    <qingful-footer></qingful-footer>
  </el-row>
</template>
<script>
import Footer from "doodoo-plugin-web/components/Footer.vue";
export default {
    components: {
        "qingful-footer": Footer
    },
    layout: "empty"
};
</script>
<style scoped>
h2 {
    color: #666;
}
h3 {
    padding: 30px 0;
    color: #666;
}
p a {
    padding: 0 10px;
}
img {
    width: 80px;
}
strong {
    border-bottom: 1px dotted #dd4b39;
    font-weight: normal;
    padding-bottom: 2px;
    color: #dd4b39;
}
</style>


