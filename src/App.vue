<template>
  <div id="app">
    <div class="operator">
      <span @click="changeComponent('CountDownContainer')">倒计时</span>
      <span @click="changeComponent('BarrageContainer')">弹幕</span>
      <span @click="changeComponent('VerticalScrollContainer')">垂直滚动</span>
      <span @click="changeComponent('LuckyWheelContainer')">转盘</span>
      <span @click="changeComponent('PosterContainer')">海报</span>
      <span @click="changeComponent('SkuContainer')">sku</span>
      <span @click="changeComponent('CanvasContainer')">canvas</span>
    </div>

    <div class="container">
      <component v-bind:is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import CountDownContainer from './components/CountDownContainer'
import BarrageContainer from './components/BarrageContainer'
import VerticalScrollContainer from './components/VerticalScrollContainer'
import LuckyWheelContainer from './components/LuckyWheelContainer'
import PosterContainer from './components/PosterContainer'
import SkuContainer from './components/SkuContainer'
import CanvasContainer from './components/CanvasContainer'

export default {
  name: 'App',
  components: {
    CountDownContainer,
    BarrageContainer,
    VerticalScrollContainer,
    LuckyWheelContainer,
    PosterContainer,
    SkuContainer,
    CanvasContainer
  },
  data () {
    return {
      currentComponent: ''
    }
  },
  methods: {
    changeComponent (name) {
      this.currentComponent = name
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
span {
  padding-right: 10px;
}
</style>
