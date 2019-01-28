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
    loading: {
      type: Boolean,
      default: false
    }
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
    handlerScroll () {
      this.computeDisplayItems()
    },
    equalArrays (arrayA, arrayB) {
      if ((!!arrayA && !arrayB) || (!arrayA && !! arrayB)) {
        return false
      }
      if(arrayA.length !== arrayB.length) {
        return
      }
      for (let i = 0, l = arrayA.length; i < l; i++) {
        if (arrayA[i] instanceof Array && arrayB[i] instanceof Array) {
          if (!this.equalArrays(arrayA[i], arrayB[i]))
            return false;
        }
        else if (arrayA[i] != array[i]) {
          return false;
        }
      }
      return true;
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
        displayIndexEnd = nonZeroIndex > 0 ? nonZeroIndex - 1 : nonZeroIndex,
        activeItemsNew = this.items.slice(displayIndexStart, displayIndexEnd + 1)

      if (equalArrays(this.activeItems, activeItemsNew)) {
        return
      }
      this.activeItems = activeItemsNew

      if (displayIndexStart === this.preStart && displayIndexEnd === this.preEnd) {
        return
      }
      this.preStart = displayIndexStart
      this.preEnd = displayIndexEnd
      this.topBufferStyle.height = displayIndexStart * this.itemHeight + 'px'
      this.bottomBufferStyle.height = Math.max(0, (this.items.length - displayIndexEnd - 1) * this.itemHeight) + 'px'

      if (displayIndexEnd + 1 >= this.items.length && !this.loading) {
        this.$emit('onInfiniteLoad')
      }
    }
  }
}