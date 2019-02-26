import Vue from 'vue'
import App from './App.vue'
import InfiniteList from '../../src/infiniteList.js'

Vue.component(InfiniteList.name, InfiniteList)

new Vue({
  el: '#app',
  render: h => h(App)
})
