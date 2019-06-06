<template>
  <div class="sku-container">
    <Sku :attrList="attrList" :goodsSku="goodsSku" />
  </div>
</template>

<script>
import Sku from './Sku'
import { getAttrList, getGoodsSku } from '../mocks/skuData5'

export default {
  name: 'sku-container',
  components: {
    Sku
  },
  data () {
    return {
      // 属性列表
      attrList: [],
      // sku映射表
      goodsSku: {}
    }
  },
  methods: {
    initData() {
      this.attrList = getAttrList()
      this.goodsSku = getGoodsSku()
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style scoped>
</style>
