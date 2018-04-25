export default {
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
    hasLoading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeItems: [],
      scrollTimeout: null,
      isScrolling: false,
      topBufferStyle: {
        height: 0
      },
      bottomBufferStyle: {
        height: 0
      }
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
    },
    scrollableStyle () {
      return this.isScrolling ? { pointerEvents: 'none' } : ''
    },
  },
  mounted() {
    this.computeDisplayItems()
  },
  methods: {
    handlerScroll () {
      this.timeoutScroll()
      this.computeDisplayItems()
    },
    timeoutScroll () {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      const that = this
      this.scrollTimeout = setTimeout(() => {
        that.isScrolling = false
        that.scrollTimeout = null
      }, 150);

      this.isScrolling = true
    },
    computeDisplayItems () {
      const scrollTop = this.$el.scrollTop || 0
      const blockNumber = this.blockSize === 0 ? 0 : Math.floor(scrollTop / this.blockSize),
        blockStart = this.blockSize * blockNumber,
        blockEnd = blockStart + this.blockSize,
        apertureTop = Math.max(0, blockStart - this.preloadSize),
        apertureBottom = Math.min(this.totalScrollableHeight, blockEnd + this.preloadSize)

      const displayIndexStart = Math.floor(apertureTop / this.itemHeight)
      const nonZeroIndex = Math.ceil(apertureBottom / this.itemHeight)
      const displayIndexEnd = nonZeroIndex > 0 ? nonZeroIndex - 1 : nonZeroIndex

      this.activeItems = this.items.slice(displayIndexStart, displayIndexEnd + 1)
      this.topBufferStyle.height = displayIndexStart * this.itemHeight + 'px'
      this.bottomBufferStyle.height = Math.max(0, (this.items.length - displayIndexEnd - 1) * this.itemHeight) + 'px'

      if (displayIndexEnd + 1 >= this.items.length && !this.loading) {
        this.$emit('onInfiniteLoad')
      }
    }
  }
}