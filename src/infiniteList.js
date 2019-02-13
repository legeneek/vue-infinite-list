const InfiniteList =  {
  name: 'infinite-list',
  props: {
    items: Array,
    containerHeight: Number,
    itemHeight: Number,
    blockFactor: {
      type: Number,
      default: 0.5
    },
    extendFactor: {
      type: Number,
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    },
    listItem: {
      required: true
    },
    spinner: {}
  },
  data () {
    return {
      activeItems: [],
      scrollTimeout: null,
      topBufferStyle: {
        height: 0
      },
      bottomBufferStyle: {
        height: 0
      },
      preStart: 0,
      preEnd: 0
    }
  },
  watch: {
    items () {
      this.computeDisplayItems()
    },
    containerHeight () {
      this.computeDisplayItems()
    },
    itemHeight () {
      this.computeDisplayItems()
    }
  },
  computed: {
    showLoading () {
      return this.loading && parseInt(this.bottomBufferStyle.height) === 0
    },
    blockSize () {
      return this.containerHeight * this.blockFactor
    },
    preloadSize () {
      return this.containerHeight * this.extendFactor
    },
    totalScrollableHeight () {
      return this.items.length * this.itemHeight
    },
    containerStyle () {
      return {
        height: this.containerHeight + 'px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        webkitOverflowScrolling: 'touch'
      }
    }
  },
  mounted() {
    this.computeDisplayItems()
  },
  methods: {
    handlerScroll (event) {
      if (event.target !== event.currentTarget) return
      this.computeDisplayItems()
    },
    computeDisplayItems () {
      const scrollTop = this.$el.scrollTop || 0
      const blockNumber = this.blockSize === 0 ? 0 : Math.floor(scrollTop / this.blockSize),
        blockStart = this.blockSize * blockNumber,
        blockEnd = blockStart + this.blockSize,
        apertureTop = Math.max(0, blockStart - this.preloadSize),
        apertureBottom = Math.min(this.totalScrollableHeight, blockEnd + this.preloadSize),
        displayIndexStart = Math.floor(apertureTop / this.itemHeight),
        nonZeroIndex = Math.ceil(apertureBottom / this.itemHeight),
        displayIndexEnd = nonZeroIndex > 0 ? nonZeroIndex - 1 : nonZeroIndex

      this.preStart = displayIndexStart
      this.preEnd = displayIndexEnd
      this.activeItems = this.items.slice(displayIndexStart, displayIndexEnd + 1)
      this.topBufferStyle.height = displayIndexStart * this.itemHeight + 'px'
      this.bottomBufferStyle.height = Math.max(0, (this.items.length - displayIndexEnd - 1) * this.itemHeight) + 'px'

      if (displayIndexEnd + 1 >= this.items.length && !this.loading) {
        this.$emit('load')
      }
    }
  },
  render (h) {
    let listItems = this.activeItems.map((item) => {
      return h(this.listItem, {props: {data: item}, key: item.id})
    })
    let loading = this.spinner ? h(this.spinner) : ''
    
    return (
      <div style={this.containerStyle} onScroll={this.handlerScroll}>
        <div>
          <div style={this.topBufferStyle}></div>
          {listItems}
          {this.showLoading ? loading : ''}
          <div style={this.bottomBufferStyle}></div>
        </div>
      </div>
    )
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(InfiniteList.name, InfiniteList)
}

export default InfiniteList