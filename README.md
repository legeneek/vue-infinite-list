# vue-infinite-list
infinite list based on vue2.

## Installation
```
npm i vue-infinite-list
```
## demo

```
npm run start
```

## Basic Use

import the infinite list component, pass the list item component and spinner component to infinite list component, config the props.

```vue
<template>
  <div id="app">
      <infinite-list @load="load" :list-item="listItem" :spinner="loadSpinner" :container-height="containerHeight" :item-height="itemHeight" :items="items" :loading="loading">
      </infinite-list>
    </div>
</template>

<script>
import ListItem from './ListItem.vue'
import LoadSpinner from './LoadSpinner.vue'
import InfiniteList from 'vue-infinite-list'

export default {
  components: {
    InfiniteList
  },
  data() {
    return {
      listItem: ListItem,
      loadSpinner: LoadSpinner
    }
  },
  methods: {
    load() {
      //...
    }
  }
  // ...
}

</script>
```

## Configuration

### listItem
the list item component

### spinner
this load spinner component

### containerHeight
the height of the list container

### itemHeight
the height of the item

### items
array of list items.
`list item data must contain a unique id which used as the key.`

### blockFactor
the list is split to many blocks of the same height(blockFactor * containerHeight)

### extendFactor
the extra height(extendFactor * containerHeight) should render

### loading
the loading status

## Event

### load
notify the parent component to load more list items
