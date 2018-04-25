<template>
  <div id="app">
    <infinite-list :container-height="containerHeight" :item-height="itemHeight" :items="items" @onInfiniteLoad="load()" :loading="loading">
    </infinite-list>
  </div>
</template>

<script>
  import InfiniteList from './InfiniteList.vue'

  let base = 1

  export default {
    name: 'app',
    components: {
      InfiniteList
    },
    data () {
      return {
        items: [],
        containerHeight: 600,
        itemHeight: 100,
        loading: false
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        const me = this
        this.loading = true

        setTimeout(function(){
          for (let i = 0; i < 20; ++i) {
            me.items.push({id: base++})
          }
          me.loading = false
        }, 200)
      },
      onload () {
        this.load()
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
