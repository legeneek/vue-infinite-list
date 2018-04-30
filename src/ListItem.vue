<template>
  <div class="list-item">
    <div class="index">{{'list item ' + data.id}}</div>
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
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .list-item .index {
    text-align: center;
  }
</style>