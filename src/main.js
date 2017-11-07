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
    strokeWidth: Number
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
    strokeWidth: Number
  },
  data: function () {
    return {
      ...this.props
    }
  },
  template: '<rect :x="x" :y="y" :key="key" :width="width" :height="height" :fill="fill" :stroke="stroke" :stroke-width="strokeWidth"></rect>'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});


