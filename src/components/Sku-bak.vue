<template>
  <transition name="popup">
    <div class="jxsg-sku join-cart"
         id="GoodsChoice"
         v-if="isShow"
         v-dark="isShow">
      <div class="shopcart-dialogues popup-wrap">
        <i class="nicon nicon-fork"
           @click="closePopup"></i>
        <!-- 商品图片、价格、库存、数量 -->
        <div class="goods-infos jxsg-bline">
          <div class="goods-pic"
               @click="previewImg">
            <img :src="currentImgMin">
          </div>
          <div class="goods-info">
            <div class="goods-price">￥{{priceSelect || goodsItem.price}}</div>
            <div class="goods-stock">库存{{stockSelect || goodsItem.goodsNumber}}件</div>
            <div class="goods-choice">{{specSelect || '请选择规格/数量'}}</div>
          </div>
        </div>
        <!-- 商品属性 -->
        <div class="join-cart-info">
          <div v-for="(attr, idx) in attrList"
               :key="attr.attrId"
               class="join-cart-item">
            <div class="title">{{attr.attrName}}</div>
            <ul class="sku-item">
              <li v-for="(value, idx2) in attr.values"
                  :key="value.valueId"
                  class="item"
                  :class="[value.canShow ? '' : 'grey', attrIndexArrSelect[idx] == idx2 ? 'active' : '']"
                  @click="changeAttr(value.valueId, idx2, idx)">{{value.valueName}}</li>
            </ul>
          </div>
        </div>
        <!-- 购买数量 -->
        <div class="z-flex item amount-choice-box">
          <div class="z-flex-item title">
            购买数量
          </div>
          <div class="amount-choice">
            <span class="amount-minus"
                  :class="[quantity > 1 ? '' : 'disable']"
                  @click="reduceQuantity">
              <i class="nicon nicon-minus"></i>
            </span>
            <span class="amount-num">{{quantity}}</span>
            <span class="amount-plus"
                  :class="[(quantity < maxStock) && canAddQuantity ? '' : 'disable']"
                  @click="addQuantity">
              <i class="nicon nicon-plus"></i>
            </span>
          </div>
        </div>
        <!-- 加入购物车/立即购买 -->
        <div class="z-flex cart-btn">
          <div v-if="btnType === 1"
               class="z-flex-item btn join-cart-btn join-cart"
               @click="addOrBuy('cart')">
            {{btn1Txt}}
          </div>
          <div class="z-flex-item btn btn-violet upgrade buy-btn"
               @click="addOrBuy('buy')">
            {{btn2Txt}}
          </div>
        </div>
      </div>
      <!-- 图片预览 -->
      <PicturePreview ref="preview"
                      :imgList="[currentImg]"
                      :showSlideTxt=false />
    </div>
  </transition>
</template>
<script type="text/javascript">
import PicturePreview from "@/components/PicturePreview";
export default {
  name: "jxsg-sku",
  components: {
    PicturePreview
  },
  props: {
    isShow: {
      // 是否显示sku
      type: Boolean,
      default: false
    },
    goodsItem: {
      // 服务端返回的商品数据
      type: Object,
      default: () => {}
    },
    btnType: {
      // 底部按钮（1：两个按钮，加入购物车和立即购买；2：一个按钮，立即购买）
      type: Number,
      default: 1
    },
    btn1Txt: {
      // 底部左侧按钮文案
      type: String,
      default: "加入购物车"
    },
    btn2Txt: {
      // 底部右侧按钮文案
      type: String,
      default: "立即购买"
    }
  },
  data() {
    return {
      canAddQuantity: true, // 是否可以点击增加商品数量
      skuInfo: {}, // 商品sku映射关系（根据goodsItem构造）
      attrList: [], // 商品属性列表（根据goodsItem构造）
      quantity: 1, // 购买的商品数量
      attrIdArrSelect: [], // 当前选中的属性Id
      attrIndexArrSelect: [], // 当前选中的属性下标
      priceSelect: "", // 当前选中的sku对应的价格
      stockSelect: "", // 当前选中的sku对应的库存
      specSelect: "", // 当前选中的sku对应的规格
      imgMinSelect: "", // 当前选中的sku对应的商品缩略图
      imgSelect: "" // 当前选中的sku对应的商品原图
    };
  },
  computed: {
    // 当前选中的缩略图
    currentImgMin() {
      return this.imgMinSelect || this.goodsItem.goodsThumb;
    },
    // 当前选中的原图
    currentImg() {
      return this.imgSelect || this.goodsItem.goodsImg;
    },
    // 当前最大库存量
    maxStock() {
      return this.stockSelect ? +this.stockSelect : +this.goodsItem.goodsNumber;
    },
    // 修正当前购买数量
    correctQuantity() {
      return this.quantity < this.maxStock ? this.quantity : this.maxStock;
    },
    // 是否限购商品
    isQuota() {
      return this.goodsItem.quotaNum && +this.goodsItem.quotaNum > 0;
    }
  },
  methods: {
    // 点击sku关闭按钮
    closePopup() {
      this.$emit("handle-close");
    },
    // 预览商品图片
    previewImg() {
      this.$refs.preview.show();
    },
    // 减少购买数量
    reduceQuantity() {
      if (this.quantity === 1) return;
      this.canAddQuantity = true;
      this.quantity--;
    },
    // 增加购买数量
    addQuantity() {
      if (this.isQuota && this.quantity >= +this.goodsItem.quotaNum) {
        this.$toast("抱歉，一个用户只能购买" + this.goodsItem.quotaNum + "件");
        this.canAddQuantity = false;
        return;
      }
      if (this.quantity >= this.maxStock) {
        this.$toast("不好意思，您选择的购买数量超过库存");
        this.canAddQuantity = false;
        return;
      }
      this.quantity++;
    },
    // 点击加入购物车/立即购买
    addOrBuy(type) {
      let _skuInfo = this.getCurrentSku();
      let tips = _skuInfo ? "" : "请选择商品规格";
      if (tips) {
        this.$toast(tips);
        return;
      }
      this.$emit("add-or-buy", {
        goodsAttrId: _skuInfo.id,
        count: this.quantity,
        type: type
      });
      this.closePopup();
    },
    // 获取当前选中的sku
    getCurrentSku() {
      let _attrIdArr = this.attrIdArrSelect.concat();
      _attrIdArr = _attrIdArr.filter(item => +item);
      _attrIdArr.sort((val1, val2) => {
        return parseInt(val1) - parseInt(val2);
      });
      return this.skuInfo[_attrIdArr];
    },
    // 设置显示规格
    setSpecification() {
      let nameArr = [];
      for (let i = 0; i < this.attrIndexArrSelect.length; i++) {
        let idx = this.attrIndexArrSelect[i];
        nameArr.push(this.attrList[i].values[idx].valueName);
      }
      return nameArr.length ? `已选:"${nameArr.join(",")}"` : "请选择数量";
    },
    // 检测sku并设置价格、库存、规格、数量
    checkSetData() {
      let _skuInfo = this.getCurrentSku();
      if (_skuInfo) {
        // 存在该sku属性
        this.priceSelect = _skuInfo.skuRetailPrice; // 设置价格
        this.stockSelect = _skuInfo.skuGoodsNumber; // 设置库存
        this.specSelect = this.setSpecification(); // 设置规格
        this.quantity = this.correctQuantity; // 更新购买数量
        this.imgMinSelect = _skuInfo.skuGoodsImgMin; // 更新缩略图
        this.imgSelect = _skuInfo.skuGoodsImg; // 更新主图
      } else {
        // 不存在该sku属性
        this.priceSelect = "";
        this.stockSelect = "";
        this.specSelect = "";
        this.imgMinSelect = "";
        this.imgSelect = "";
      }
    },
    // 点击改变属性
    changeAttr(id, innerIdx, outerIdx) {
      this.canAddQuantity = true;
      if (+this.attrIdArrSelect[outerIdx] !== +id) {
        this.attrIdArrSelect[outerIdx] = id;
        this.attrIndexArrSelect[outerIdx] = innerIdx;
      } else {
        this.attrIdArrSelect[outerIdx] = "";
        this.attrIndexArrSelect[outerIdx] = -1;
      }
      this.checkAttrList();
    },
    /**
     * 检测属性可否点击（数量是否为0）
     * id 属性id
     * index 第几行属性
     */
    checkAttr(id, index) {
      let _attrIdArr = this.attrIdArrSelect.concat();
      _attrIdArr[index] = id;
      _attrIdArr = _attrIdArr.filter(item => +item);
      _attrIdArr.sort((val1, val2) => {
        return parseInt(val1) - parseInt(val2);
      });
      let _key = _attrIdArr.join(",");
      // 完全匹配上
      if (this.skuInfo[_key] && +this.skuInfo[_key].skuGoodsNumber > 0)
        return true;
      // 不完全匹配，则需要循环来判断
      for (let key in this.skuInfo) {
        let flag = true;
        let keyArr = key.split(",");
        for (let i = 0; i < _attrIdArr.length; i++) {
          if (!keyArr.includes(_attrIdArr[i])) {
            flag = false;
          }
        }
        if (flag && +this.skuInfo[key].skuGoodsNumber > 0) {
          return true;
        }
      }
      return false;
    },
    // 检测所有属性可否点击（数量是否为0）
    checkAttrList() {
      for (let i = 0, len = this.attrList.length; i < len; i++) {
        let item = this.attrList[i];
        for (let j = 0, len2 = item.values.length; j < len2; j++) {
          item.values[j].canShow = this.checkAttr(item.values[j].valueId, i);
        }
      }
      this.$forceUpdate();
      this.checkSetData();
    },
    // 设置商品属性列表
    setAttrList() {
      let list = this.goodsItem.attrList;
      for (let i = 0, len = list.length; i < len; i++) {
        let values = [],
          item = list[i];
        for (let j = 0, len2 = item.values.length; j < len2; j++) {
          values.push({
            valueId: item.values[j].valueId,
            valueName: item.values[j].valueName,
            canShow: true
          });
        }
        this.attrList.push({
          attrId: item.attrId,
          attrName: item.attrName,
          values: values
        });
      }
    },
    // 设置商品sku映射关系
    setSkuInfo() {
      let list = this.goodsItem.goodsSku;
      for (let i = 0, len = list.length; i < len; i++) {
        this.skuInfo[list[i].attrValueIdSort] = list[i];
      }
    },
    // 设置默认选中的属性（当属性值只有一个的时候，默认选中）
    setDefaultAttr() {
      if(this.attrList.length === 1 && this.attrList[0].values.length === 1) {
        this.changeAttr(this.attrList[0].values[0].valueId, 0, 0);
      }
    },
    // 初始化数据
    initData() {
      this.resetData();
      this.setSkuInfo();
      this.setAttrList();
      this.checkAttrList();
      this.setDefaultAttr();
    },
    // 重置数据
    resetData() {
      this.canAddQuantity = true;
      this.skuInfo = {};
      this.attrList = [];
      this.quantity = 1;
      this.attrIdArrSelect = [];
      this.attrIndexArrSelect = [];
      this.priceSelect = "";
      this.stockSelect = "";
      this.specSelect = "";
      this.imgMinSelect = "";
      this.imgSelect = "";
    }
  },
  watch: {
    goodsItem() {
      this.initData();
    }
  }
};
</script>

<style type="text/css" lang="scss">
@import "src/assets/scss/_px2rem.scss";
.jxsg-sku {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  &.popup-enter-active {
    transition: all 0.5s;
    .popup-wrap {
      transition: all 0.5s;
    }
  }
  &.popup-leave-active {
    transition: all 0.5s;
    .popup-wrap {
      transition: all 0.5s;
    }
  }
  &.popup-enter {
    opacity: 0;
    .popup-wrap {
      opacity: 0;
      bottom: -60vh;
    }
  }
  &.popup-leave-to {
    opacity: 0;
    .popup-wrap {
      opacity: 0;
      bottom: -60vh;
    }
  }
  .popup-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 45vh;
    background: #fff;
  }
  &.join-cart {
    overflow: hidden;
    .shopcart-dialogues {
      .nicon-fork {
        padding: px2rem(7);
        position: absolute;
        right: px2rem(18);
        top: px2rem(18);
        border-radius: 50%;
        font-size: px2rem(28);
        padding: px2rem(20);
        color: #999;
        z-index: 99;
      }
      .z-flex.item {
        padding: px2rem(0) px2rem(24) px2rem(30) px2rem(24);
        height: px2rem(100);
        .title {
          font-size: px2rem(26);
        }
      }
      .z-flex.item:after {
        left: 0;
        border: 0;
        height: 0;
      }
      .goods-infos {
        padding: px2rem(10) px2rem(24) px2rem(26);
        min-height: px2rem(150);
        .goods-pic {
          position: absolute;
          top: px2rem(-32);
          width: px2rem(190);
          height: px2rem(190);
          z-index: 100;
          background-color: #fff;
          img {
            width: px2rem(190);
            height: px2rem(190);
            &.am {
              width: px2rem(190);
              height: px2rem(190);
            }
          }
        }
        .goods-info {
          margin-left: px2rem(215);
          .goods-price {
            padding: 0;
            margin: 0;
            margin-top: px2rem(38);
            font-size: px2rem(32);
            color: #fb3180;
          }
          .goods-stock {
            font-size: px2rem(24);
            color: #666;
          }
          .goods-choice {
            font-size: px2rem(24);
            color: #666;
          }
        }
      }
      .amount-choice-box {
        margin-bottom: px2rem(100);
      }
      .amount-choice {
        position: relative;
        &:before {
          display: table;
          content: " ";
        }
        &:after {
          content: " ";
          clear: both;
        }
        border: 1px #efefef solid;
        border-radius: px2rem(5);
        height: px2rem(60);
        .disable {
          .nicon {
            color: #efefef;
          }
        }
        .nicon {
          font-size: px2rem(24);
          font-weight: bold;
          color: #666;
        }
        .amount-minus,
        .amount-plus {
          float: left;
          display: block;
          position: relative;
          padding: px2rem(0) px2rem(42);
          height: 100%;
          .nicon {
            position: absolute;
            left: 50%;
            top: 50%;
            margin: 0 auto;
            transform: translate(-50%, -50%);
          }
        }
        .amount-num {
          float: left;
          padding: px2rem(15) px2rem(5);
          border-left: 1px #efefef solid;
          border-right: 1px #efefef solid;
          line-height: 1;
          font-size: px2rem(30);
          width: px2rem(90);
          text-align: center;
        }
      }
      .cart-btn {
        position: absolute;
        width: 100%;
        bottom: 0;
        .btn {
          padding: px2rem(29) 0;
          font-size: px2rem(28);
          border-radius: 0;
        }
        .btn-violet {
          background: #ff0090;
          color: #fff;
        }
        .join-cart-btn {
          color: #fff;
          background: #404040;
        }
        .join-cart-in {
          color: #fff;
          background: #f7317a;
        }
      }
      .confirm-modify {
        position: absolute;
        bottom: 0;
        width: 100%;
        .btn-confirm {
          display: block;
          height: px2rem(88);
          line-height: px2rem(88);
          text-align: center;
          font-size: px2rem(30);
          color: #fff;
        }
        background-color: #fb3180;
      }
    }
    .join-cart-info {
      max-height: px2rem(528);
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .join-cart-item {
        padding: 0 px2rem(24);
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: #e0e0e0;
          color: #e0e0e0;
          -webkit-transform-origin: 0 0;
          -ms-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0.5);
          -ms-transform: scaleY(0.5);
          transform: scaleY(0.5);
          left: 0;
        }
        .title {
          font-size: px2rem(26);
          height: px2rem(84);
          line-height: px2rem(84);
          color: #666;
        }
        .sku-item {
          padding-bottom: px2rem(10);
          .item {
            float: left;
            margin-right: px2rem(15);
            margin-bottom: px2rem(20);
            padding: px2rem(15) px2rem(35);
            background: #fff;
            font-size: px2rem(26);
            line-height: 1;
            color: #666;
            border: 1px solid #999;
            border-radius: px2rem(4);
            &.active {
              color: #fb3180;
              border-color: #fb3180;
            }
            &.grey {
              pointer-events: none;
              color: #ccc;
              border: 1px dashed #ccc;
            }
          }
          &:after {
            clear: both;
            position: static;
          }
          &:after,
          &:before {
            display: table;
            content: " ";
          }
        }
      }
    }
  }
}
</style>
