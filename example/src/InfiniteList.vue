<template>
  <div :style="containerStyle" @scroll.self="handlerScroll()">
    <div>
      <div :style="topBufferStyle"></div>
      <list-item v-for="item in activeItems" :key="item.id" :data="item"></list-item>
      <load-spinner v-show="showLoading"></load-spinner>
      <div :style="bottomBufferStyle"></div>
    </div>
  </div>
</template>

<script>
  import ListItem from './ListItem.vue'
  import LoadSpinner from './LoadSpinner.vue'
  import infiniteMix from '../../src/infiniteMix'

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
    }
  }
</script>
