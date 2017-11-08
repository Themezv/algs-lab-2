// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('svgLine', {
  props: {
    x1: Number,
    x2: Number,
    y1: Number,
    y2: Number,
    stroke: {
      type: String,
      default: '#000'
    },
    strokeWidth: {
      type: Number,
      default: 1,
    }
  },
  data: function () {
    return {
      ...this.props
    }
  },
  template: '<line :x1="x1" :x2="x2" :y1="y1" :y2="y2" :stroke="stroke" :stroke-width="strokeWidth"></line>'
});

Vue.component('svgNode', {
  props: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    stroke: {
      type: String,
      default: '#000'
    },
    fill: {
      type: String,
      default: '#fff'
    },
    strokeWidth: Number,
    kv: Number,
  },
  data: function () {
    return {
      ...this.props,
      styleObject: {
        fontSize: String(this.width) + 'px',
        textAlign: 'center'
      }
    }
  },
  template: '<g :key="key"><rect :x="x" :y="y" :width="width" :height="height" :fill="fill" :stroke="stroke" :stroke-width="strokeWidth"></rect><text :style="styleObject" :x="x + 0.15*width" :y="y+height - 0.1*height" font-family="Verdana">{{kv}}</text></g>'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});


