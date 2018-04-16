<template>
  <div :style="containerStyle" @scroll.self="handlerScroll()">
    <div :style="scrollableStyle">
      <div class="top-buffer" :style="topBufferStyle"></div>
      <list-item v-for="(item, index) in activeItems" :key=item :data="item"></list-item>
      <load-spinner v-show="showLoading"></load-spinner>
      <div class="bottom-buffer" :style="bottomBufferStyle"></div>
    </div>
  </div>
</template>

<script>
  import ListItem from './ListItem.vue'
  import LoadSpinner from './LoadSpinner.vue'
  import infiniteMix from './infiniteMix'

  export default {
    components: {
      ListItem,
      LoadSpinner
    },
    mixins: [infiniteMix],
    data () {
      return {
      }
    }
  }
</script>
