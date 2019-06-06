<template>
  <div id="vertical-scroll">
    <div ref="scrollWraper" :class="{anim:animate == true}">
      <slot name="scroll-content"></slot>
    </div>
  </div>
</template>

<script>
import getRect from '../utils/get-rect'

export default {
  name: 'vertical-scroll',
  props: {
    // 调整数组顺序
    handleAdjustOrder: {
      type: Function,
      required: true,
      default: (params) => {}
    },
    // 是否开启滚动
    scrollable: {
      type: Boolean,
      default: true
    },
    scrollInterval: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      animate: false
    }
  },
  methods: {
    // 滚动
    scroll () {
      if (this.$refs.scrollWraper) {
        let scrollLoop = document.getElementById('vertical-scroll')
        let scrollWraper = this.$refs.scrollWraper
        scrollWraper.style.marginTop = `-${getRect(scrollLoop).height}px`
        this.animate = true
        setTimeout(() => {
          this.handleAdjustOrder()
          scrollWraper.style.marginTop = '0px'
          this.animate = false
        }, 500)
      }
    },
    // 初始化滚动循环定时器
    initScrollLoop () {
      if (this.scrollable) {
        setInterval(this.scroll, this.scrollInterval)
      }
    }
  },
  mounted () {
    this.initScrollLoop()
  }
}
</script>

<style scoped>
#vertical-scroll {
  height: 100%;
}
#vertical-scroll .anim {
  transition: all 0.5s;
}
</style>
