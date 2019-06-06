<template>
  <div id="sku">
    <div class="detail">
      <p>已选商品：</p>
      <p>价格：{{currentPrice}}</p>
      <p>库存：{{currentCount}}</p>
    </div>
    <div class="sku-container">
      <div class="attr-list" v-for="(attrItem, idx) in attrList" :key="idx">
        <p>{{attrItem.attrName}}</p>
        <div class="attr">
          <span v-for="attr in attrItem.values"
            :key="attr.valueId"
            :class="[ +currentSkuAttr[idx] === +attr.valueId ? 'active' : '',
                      checkDisable(attr.valueId, idx) ? 'disable' : '']"
            @click="changeSku(attr.valueId, idx)">{{attr.valueName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sku',
  props: {
    attrList: {
      // 属性列表
      type: Array,
      default: () => []
    },
    goodsSku: {
      // sku映射表
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      skuKeys: [], // sku keys
      skuResult: [], // sku所有结果集
      currentSkuAttr: [], // 当前选中的sku属性
      currentPrice: '', // 当前选中的sku价格
      currentCount: '' // 当前选中的sku库存
    }
  },
  methods: {
    getSkuAttrString(arr) {
      let _arr = arr.concat()
      _arr.sort((val1, val2) => {
        return parseInt(val1) - parseInt(val2);
      })
      return _arr.join(',')
    },
    // 判断sku库存
    checkDisable(valueId, index) {
      let arr = this.currentSkuAttr.filter((item, idx) => {
        if(idx === index || +item === -1) {
          return false
        }
        return true
      })
      arr.push(valueId)
      let _key = this.getSkuAttrString(arr)
      if(!this.skuResult[_key]) return false
      return +this.skuResult[_key].count > 0 ? false : true
    },
    // 切换sku属性
    changeSku(valueId, idx) {
      let flag = this.checkDisable(valueId, idx)
      if(flag) return
      if(+this.currentSkuAttr[idx] === +valueId) {
        this.$set(this.currentSkuAttr, idx, -1)
      } else {
        this.$set(this.currentSkuAttr, idx, valueId)
      }
      let arr = this.currentSkuAttr.filter((item, idx) => {
        if(+item === -1) {
          return false
        }
        return true
      })
      let _key = this.getSkuAttrString(arr)
      if(this.skuResult[_key]) {
        this.currentCount = this.skuResult[_key].count
        let maxVal = Math.max.apply(null, this.skuResult[_key].prices)
        let minVal = Math.min.apply(null, this.skuResult[_key].prices)
        if(maxVal === minVal) {
          this.currentPrice = maxVal
        } else {
          this.currentPrice = `${minVal} ~ ${maxVal}`
        }
      }
    },
    // 把所有sku属性组合的值添加到skuResult
    add2SkuResult(combArrItem, sku) {
      if(this.skuResult[combArrItem]) {
        this.skuResult[combArrItem].count += +sku.count
        this.skuResult[combArrItem].prices.push(sku.price)
      } else {
        this.skuResult[combArrItem] = {
          count: +sku.count,
          prices: [sku.price]
        }
      }
    },
    // 获取所有sku属性组合
    getCombination(skuKeyAttrs) {
      let combinationGroup = []
      for(let i=0; i<skuKeyAttrs.length; i++) {
          let len = combinationGroup.length
          for(let j=0; j<len; j++) {
              let val = combinationGroup[j] + ',' + skuKeyAttrs[i]
              combinationGroup.push(val)
          }
          combinationGroup.push(skuKeyAttrs[i])
      }
      return combinationGroup
    },
    // 设置所有sku组合
    setSkuResult() {
      for(let i=0; i<this.skuKeys.length; i++) {
        let skuKey = this.skuKeys[i]
        let sku = this.goodsSku[skuKey]
        // console.info('sku: ', sku)
        // console.info('skuKey: ', skuKey)
        let skuKeyAttrs = skuKey.split(',')
        skuKeyAttrs.sort((val1, val2) => {
          return parseInt(val1) - parseInt(val2);
        })
        // console.info('skuKeyAttrs: ', skuKeyAttrs)
        let combArr = this.getCombination(skuKeyAttrs)
        // console.info('combArr: ', combArr)
        for( let j=0; j<combArr.length; j++) {
          this.add2SkuResult(combArr[j], sku)
        }
      }
      console.info('skuResult: ', this.skuResult)
    },
    // 获取所有sku keys
    getSkuKeys() {
      for(let key in this.goodsSku) {
        this.skuKeys[this.skuKeys.length] = key
      }
    },
    // 初始化当前选中的sku属性
    setCurrentSkuAttr() {
      for(let i=0; i<this.attrList.length; i++) {
        this.currentSkuAttr[i] = -1
      }
    },
    // 初始化sku
    initSKU() {
      this.setCurrentSkuAttr()
      this.getSkuKeys()
      this.setSkuResult()
    }
  },
  created () {
    this.initSKU()
  }
}
</script>

<style scoped>
  .detail {
    margin-bottom: 30px;
  }
  .sku-container .attr-list .attr span {
    display: inline-block;
    margin-right: 10px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border:  1px solid #ccc;
  }
  .sku-container .attr-list .attr span.active {
    border-color: red;
  }
  .sku-container .attr-list .attr span.disable {
    border: 2px dashed #eee;
  }
</style>
