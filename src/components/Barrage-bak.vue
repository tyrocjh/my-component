<!-- 该方法是通过css3动画来实现的，目前存在1个问题：
      当设置loop为true时，页面上的弹幕会越来越多，如果清掉，页面结构会改变，导致弹幕消失；
      临时方案：第一轮循环结束后（所有动画都结束），先清弹幕，再重新渲染 -->
<template>
  <div id="barrage">
    <div class="barrage" :class="'line-count-' + lineCount">
      <span class="msg" v-for="(item, idx) in currentList" :key="idx">
        {{item.msg}} - {{idx}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'barrage',
  props: {
    list: {
      // 弹幕池（不能直接使用）
      type: Array,
      default: () => [],
      required: true
    },
    lineCount: {
      // 弹幕行数
      type: Number,
      default: 1
    },
    speed: {
      // 弹幕速度（每隔多少秒放入一条弹幕）
      type: Number,
      default: 3
    },
    loop: {
      // 弹幕是否无限循环
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentList: [], // 正在使用的弹幕池
      tmpList: [], // 临时使用的弹幕池
      barrageInterval: null // 弹幕定时器
    }
  },
  methods: {
    // 重置数据
    resetData () {
      this.currentList = []
      this.tmpList = []
    },
    // 清除弹幕定时器
    clearBarrageInterval () {
      clearInterval(this.barrageInterval)
      this.barrageInterval = null
    },
    // 执行弹幕
    execBarrage () {
      this.tmpList = [...this.list]
      this.barrageInterval = setInterval(() => {
        if (this.tmpList.length > 0) {
          this.currentList.push(this.tmpList.shift())
        } else {
          if (this.loop) {
            this.tmpList = [...this.list]
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
    }
  },
  created () {
    this.addEvents()
    this.execBarrage()
  }
}
</script>

<style scoped>
.barrage {
  position: relative;
  margin-top: 50px;
  width: 100%;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
}
.barrage .msg {
  position: absolute;
  white-space: nowrap;
  animation: moveRightToLeft 8s linear forwards;
}

.barrage.line-count-2 {
  height: 60px;
}
.barrage.line-count-2 .msg:nth-child(2n) {
  top: 25px;
}

.barrage.line-count-3 {
  height: 90px;
}
.barrage.line-count-3 .msg:nth-child(3n-1) {
  top: 25px;
}
.barrage.line-count-3 .msg:nth-child(3n) {
  top: 50px;
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
