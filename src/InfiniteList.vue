<template>
  <div :style="containerStyle" @scroll.self="handlerScroll()">
    <div :style="scrollableStyle">
      <div :style="topBufferStyle"></div>
      <list-item v-for="item in activeItems" :key="getItemKey()" :data="item"></list-item>
      <load-spinner v-show="showLoading"></load-spinner>
      <div :style="bottomBufferStyle"></div>
    </div>
  </div>
</template>

<script>
  import ListItem from './ListItem.vue'
  import LoadSpinner from './LoadSpinner.vue'
  import infiniteMix from './infiniteMix'

  let baseKey = 1

  export default {
    components: {
      ListItem,
      LoadSpinner
    },
    mixins: [infiniteMix],
    data () {
      return {
      }
    },
    methods: {
      getItemKey () {
        return baseKey++
      }
    }
  }
</script>
