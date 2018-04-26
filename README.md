# vue-infinite-list
infinite list

##Installation
```
npm i vue-infinite-list
```

##Basic Use

###create a helper component

import your custom list item component(ListItem) and your custom spinner component(LoadSpinner).
import the mixin file you installed.
use the mixin in helper component.
make sure the key for 'v-for' is unique.

```vue
<template>
  <div :style="containerStyle" @scroll.self="handlerScroll()">
    <div>
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
  import infiniteMix from 'vue-infinite-list'

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
```

###use helper component 

```vue
<helper-comp :container-height="containerHeight" :item-height="itemHeight" :items="items" blockFactor='0.5' extendFactor="1" @onInfiniteLoad="load()" :loading="loading">
    </helper-comp>
```

##Configuration

###containerHeight
the height of the list container

###itemHeight
the height of the item

###items
array of list items

###blockFactor
the list is split to many blocks of the same height(blockFactor * containerHeight)

###extendFactor
the extra height(extendFactor * containerHeight) should render

###loading
the loading status

##Event

###onInfiniteLoad
notify the parent component to load more list items