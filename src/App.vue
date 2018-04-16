<template>
  <div id="app">
    <infinite-list :container-height="containerHeight" :item-height="itemHeight" :items="items"  :init-num="10" has-loading @onInfiniteLoad="load()" :finished="finished">
    </infinite-list>
  </div>
</template>

<script>
  import InfiniteList from './InfiniteList.vue'

  export default {
    name: 'app',
    components: {
      InfiniteList
    },
    data () {
      return {
        items: [],
        containerHeight: 400,
        itemHeight: 100,
        base: 1,
        finished: false
      }
    },
    created () {
      for (let i = 0; i < 11; ++i) {
        this.items.push(this.base++)
      }
    },
    watch: {
      items(n) {
        if (n.length > 60) {
          this.finished = true
        }
      }
    },
    methods: {
      load () {
        const me = this
        setTimeout(function() {
          for (let i = 0; i < 10; ++i) {
            me.items.push(me.base++)
          }
        }, 1000)
      }
    }
  }
</script>

<style>
  html,body {
    height: 100%;
    margin: 0;
  }
  #app {
    border: 2px solid #000;
  }
</style>
