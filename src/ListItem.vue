<template>
  <div class="list-item">
    <div class="index">{{data.id}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style>
  .list-item {
    box-sizing: border-box;
    height: 100px;
    line-height: 100px;
    font-size: 20px;
    text-align: center;
    padding-bottom: 10px;
  }
  .list-item .index {
    width: 20%;
    text-align: center;
    float: left;
  }
  .list-item  .cover {
    display: block;
    width: 80%;
    height: 100%;
    float: left;
  }
</style>