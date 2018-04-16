<template>
  <div class="list-item" :style="getStyle()">{{data}}</div>
</template>

<script>
  function getRandomColor () {
    const hex = '0123456789ABCEDF'
    let color = '#FF'
    for (let i = 0; i < 4; ++i) {
      color += hex[Math.floor(Math.random() * 16)]
    }
    return color
  }

  export default {
    props: {
      data: {}
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    updated() {
    },
    methods: {
      getStyle() {
        return {
          backgroundColor: getRandomColor()
        }
      }
    }
  }
</script>

<style>
  .list-item {
    height: 100px;
    width: 200px;
    line-height: 100px;
    font-size: 20px;
    text-align: center;
    color: #fff;
  }
</style>