<template>
  <div id="barrage">
    <div ref="barrage" class="barrage"></div>
  </div>
</template>

<script>
import getRect from '../utils/get-rect'

export default {
  name: 'barrage',
  props: {
    list: {
      // 弹幕池（不能直接使用）
      type: Array,
      default: () => [],
      required: true
    },
    speed: {
      // 弹幕速度（每隔多少秒放入一条弹幕）
      type: Number,
      default: 2
    },
    channelCount: {
      // 弹幕行数
      type: Number,
      default: 2
    },
    channelHeight: {
      // 弹道高度
      type: Number,
      default: 25
    },
    channelOrder: {
      // 填入弹道的顺序
      type: Array,
      default: () => []
    },
    intelligent: {
      // 是否需要智能插入弹幕（往弹幕总宽度最小的弹道添加弹幕）
      type: Boolean,
      default: false
    },
    loop: {
      // 弹幕是否无限循环
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tmpList: [], // 临时使用的弹幕池
      barrageInterval: null, // 弹幕定时器
      barrageIndex: 1, // 弹幕下标（第几个弹幕）
      channelEl: [] // 每条弹道内最后一个弹幕元素
    }
  },
  methods: {
    // 重置数据
    resetData () {
      this.tmpList = []
    },
    // 清除弹幕定时器
    clearBarrageInterval () {
      clearInterval(this.barrageInterval)
      this.barrageInterval = null
    },
    /**
     * @description 获取弹道下标（第几条弹道）
     * @param el [Object] dom元素
     */
    getChannelIdx (el) {
      let idx = el.getAttribute('data-index')
      let channelNum = idx % this.channelCount === 0 ? this.channelCount : idx % this.channelCount

      if (this.intelligent) {
        // 智能插入弹幕
        let comparedArr = []
        // 比较每条弹道的最后一条弹幕的右侧距离，往最小距离的弹道插入弹幕
        this.channelEl.forEach((item, idx) => {
          let w = isNaN(item) ? (getRect(item).left + getRect(item).width) : 0
          comparedArr.push(w)
        })
        let minW = Math.min(...comparedArr)
        let idx = comparedArr.indexOf(minW)
        this.channelEl[idx] = el
        return idx + 1
      } else if (this.channelCount === this.channelOrder.length) {
        // 根据channelOrder决定弹幕放在第几条弹道
        return this.channelOrder[channelNum - 1]
      } else {
        return channelNum
      }
    },
    /**
     * @description 创建dom元素，加入弹道，监听动画结束
     * @param barrage [Object] 弹幕对象
     */
    appendBarrage (barrage) {
      let el = document.createElement('span')
      el.classList.add('msg')
      el.innerHTML = barrage.msg
      el.setAttribute('data-index', this.barrageIndex++) // 设置下标（第几个弹幕）
      this.$refs.barrage.appendChild(el)

      this.$nextTick(() => {
        el.style.top = (this.getChannelIdx(el) - 1) * this.channelHeight + 'px' // 设置弹幕高度

        el.addEventListener('animationend', () => {
          this.$refs.barrage.removeChild(el)
        })
      })
    },
    // 执行弹幕
    execBarrage () {
      this.tmpList = [...this.list]
      this.barrageInterval = setInterval(() => {
        if (this.tmpList.length > 0) {
          this.$nextTick(() => {
            this.appendBarrage(this.tmpList.shift())
          })
        } else {
          if (this.loop) {
            this.tmpList = [...this.list]
            this.$nextTick(() => {
              this.appendBarrage(this.tmpList.shift())
            })
          } else {
            this.clearBarrageInterval()
          }
        }
      }, this.speed * 1000)
    },
    // 添加事件监听
    addEvents () {
      // 监听页面是否可见
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          // 当页面可见时，开启弹幕
          this.execBarrage()
        } else {
          // 当页面不可见（eg.处于后台）时，清空弹幕数据，停止定时器（防止定时器在页面处于后台时继续触发，导致弹幕扎堆）
          this.clearBarrageInterval()
          this.resetData()
        }
      })
    },
    // 检测是否智能插入弹幕
    checkIntelligent () {
      if (this.intelligent) {
        // 初始化弹道元素距离为0
        for (let i=0; i<this.channelCount; i++) {
          this.channelEl.push(0)
        }
      }
    }
  },
  created () {
    this.checkIntelligent()
    this.addEvents()
    this.execBarrage()
  }
}
</script>

<style>
#barrage {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.barrage {
  position: relative;
  height: 100%;
  width: 100%;
  white-space: nowrap;
}

.barrage .msg {
  position: absolute;
  white-space: nowrap;
  animation: moveRightToLeft 12s linear forwards;
}

@keyframes moveRightToLeft {
  0% {
    -webkit-transform: translate3d(375px, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-375px, 0, 0);
  }
}
</style>
