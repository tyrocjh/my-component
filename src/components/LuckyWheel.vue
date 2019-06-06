<template>
  <div id="lucky-wheel">
    <div class="mask"></div>
    <div class="light1"></div>
    <div class="light2"></div>
    <div class="wheel">
      <img src="../assets/imgs/wheel.png" :style="{transform: rotateTransform, transition: rotateTransition}">
      <div class="img-mask"></div>
    </div>
    <div class="pointer" @click="lottoHandle">
      <img v-if="lottoClickable" src="../assets/imgs/pointer-start.png">
      <img v-else src="../assets/imgs/pointer-starting.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuckyWheel',
  props: {
    resultAngle: {
      // 根据返回的奖品下标，决定旋转停止时所处的弧度，原始弧度为[315, 270, 225, 180, 135, 90, 45, 0]
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      prizeIndex: 8, // 奖品下标
      stopRotate: false, // 是否停止转动
      lottoClickable: true, // 是否能够点击抽奖按钮
      rotateAngleInit: 0, // 初始旋转的角度
      rotateAngle: 0, // 将要旋转的角度
      rotateTransition: '', // 旋转过度属性
      extraCircle: 1, // 获取数据后转动的额外圈数
      rotateInterval: null // 转盘定时器
    }
  },
  computed: {
    rotateTransform () {
      return `rotate(${this.rotateAngle}deg)`
    }
  },
  methods: {
    // 重置转盘信息
    rotatingReset (angle) {
      this.lottoClickable = true // 恢复抽奖按钮可点击
      this.rotateTransition = '' // 取消过渡动画
      this.rotateAngle = angle // 重置角度
      this.rotateAngleInit = this.rotateAngle // 重置初始角度
    },
    // 抽奖盘转动结束
    finishRotating () {
      this.rotateTransition = 'transform 2.5s ease-out' // 总时间 = 降速转圈每圈2s * (extraCircle + 1)
      this.rotateAngle =
        this.rotateAngle +
        this.extraCircle * 360 +
        this.resultAngle[this.prizeIndex - 1] -
        this.rotateAngleInit // 计算指针停止的位置
      // 转盘结束后触发
      setTimeout(() => {
        this.rotatingReset(this.rotateAngle % 360)
        this.$emit(
          'handleShowModal'
        )
      }, 3000)
    },
    // 抽奖盘转动
    rotating () {
      this.rotateTransition = 'transform 0.8s linear' // 匀速转圈每圈0.8s
      this.rotateAngle = this.rotateAngleInit + 720
      // 循环转动，期间异步获取奖品数据
      this.rotateInterval = setInterval(() => {
        this.rotateAngle = this.rotateAngle + 720
        // 获取到抽奖信息，销毁定时器
        if (this.stopRotate) {
          clearInterval(this.rotateInterval)
          this.rotateInterval = null
          this.finishRotating()
        }
      }, 800)
    },
    // 获取抽奖信息
    getLottoData () {
      // 模拟延时一秒获取抽奖结果信息
      setTimeout(() => {
        this.prizeIndex = 2 // 奖品下标
        this.stopRotate = true
      }, 1000)
    },
    // 点击抽奖
    handleDraw () {
      this.rotating()
      this.getLottoData()
    },
    // 点击抽奖按钮
    lottoHandle () {
      if (!this.lottoClickable) return // 禁止点击抽奖按钮

      this.lottoClickable = false
      this.handleDraw()
    }
  }
}
</script>

<style scoped>
#lucky-wheel {
  position: relative;
  width: 346px;
  height: 346px;
}

#lucky-wheel .img-mask {
  position: absolute;
  width: 120%;
  height: 120%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#lucky-wheel .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #780000;
  background-size: contain;
  opacity: 0.2;
}

#lucky-wheel .light1, #lucky-wheel .light2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#lucky-wheel .light1 {
    width: 301px;
    height: 301px;
    background: url(../assets/imgs/light1.png) no-repeat;
    background-size: contain;
    animation: maskFade1 1.5s linear infinite;
}

#lucky-wheel .light2 {
  opacity: 0.2;
  width: 324px;
  height: 324px;
  background: url(../assets/imgs/light2.png) no-repeat;
  background-size: contain;
  animation: maskFade2 1.5s linear infinite;
}

#lucky-wheel .wheel, #lucky-wheel .pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#lucky-wheel .wheel, #lucky-wheel .wheel img {
  width: 294px;
  height: 294px;
}

#lucky-wheel .pointer, #lucky-wheel .pointer img {
  width: 116px;
  height: 125px;
}

@-webkit-keyframes maskFade1 {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.2;
  }
  75% {
    opacity: 1;
  }
}
@-webkit-keyframes maskFade2 {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.2;
  }
}
</style>
