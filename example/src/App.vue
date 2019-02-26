<template>
  <div id="app">
      <infinite-list @load="load" :list-item="listItem" :spinner="loadSpinner" :container-height="containerHeight" :item-height="itemHeight" :items="items" :loading="loading">
      </infinite-list>
    </div>
</template>

<script>
import ListItem from './ListItem.vue'
import LoadSpinner from './LoadSpinner.vue'

let base = 1

export default {
  name: 'app',
  data() {
    return {
      listItem: ListItem,
      loadSpinner: LoadSpinner,
      items: [],
      containerHeight: 600,
      itemHeight: 100,
      loading: false
    }
  },
  created() {
    this.load()
    this.$on('infinite-load', () => {
      this.load()
    })
  },
  methods: {
    load() {
      const me = this
      this.loading = true

      setTimeout(function () {
        for (let i = 0; i < 20; ++i) {
          me.items.push({ id: base++ })
        }
        me.loading = false
      }, 200)
    }
  }
}
</script>
