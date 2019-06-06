<template>
  <div class="count-down">
    <span v-if="showDay" class="days">
      <span class="num">{{days}}</span>
      <i class="separator">{{separatorObj[separatorType][0]}}</i>
    </span>
    <span v-if="showHour" class="hours">
      <span class="num">{{hours}}</span>
      <i class="separator">{{separatorObj[separatorType][1]}}</i>
    </span>
    <span v-if="showMinute" class="minutes">
      <span class="num">{{minutes}}</span>
      <i class="separator">{{separatorObj[separatorType][2]}}</i>
    </span>
    <span v-if="showSecond" class="second">
      <span class="num">{{second}}</span>
      <i class="separator">{{separatorObj[separatorType][3]}}</i>
    </span>
    <span v-if="showMillisecond" class="millisecond">
      <span class="num">{{millisecond}}</span>
    </span>
  </div>
</template>

<script>
/**
 * 描述：
 * 1.只传restTime剩余时间
 * 2.只传endTime结束时间
 * 3.只传startTime开始时间
 * 4.传startTime开始时间、endTime结束时间、switchStatus状态切换器（当开始剩余时间为0时，切换为剩余时间的倒计时）
 *
 * <CountDown :restTime="123630" :showDay="true" :showMillisecond="true" :separatorType="3" @countDownEnd="xxx"></CountDown>
 * <CountDown :switchStatus="true" :startTime="1540367745678" :endTime="1540367845678" :showDay="true"></CountDown>
 *
 * restTime        -> 剩余时间（单位秒s）
 * endTime         -> 结束时间（时间戳）
 * startTime       -> 开始时间（时间戳）
 * switchStatus    -> 距开始剩余时间 距结束剩余时间 状态切换器
 * showDay         -> 是否显示天数
 * showHour        -> 是否显示小时
 * showMinute      -> 是否显示分钟
 * showSecond      -> 是否显示秒数
 * showMillisecond -> 是否显示毫秒
 * showPreZero     -> 是否前置补零
 * separatorType   -> 分隔符类型（1.空格 2.分号 3.中文）
 * countDownEnd    -> 回调方法
 */
const SECONDS_IN_MINTUE = 60
const SECONDS_IN_HOUR = 60 * 60
const SECONDS_IN_DAY = 60 * 60 * 24

export default {
  name: 'count-down',
  props: {
    restTime: {
      // 剩余时间（单位秒s）
      type: Number,
      default: -1
    },
    endTime: {
      // 结束时间（时间戳）
      type: Number,
      default: -1
    },
    startTime: {
      // 开始时间（时间戳）
      type: Number,
      default: -1
    },
    switchStatus: {
      // 状态切换器（距开始剩余时间->距结束剩余时间）
      type: Boolean,
      default: false
    },
    showDay: {
      // 是否显示天数
      type: Boolean,
      default: false
    },
    showHour: {
      // 是否显示小时
      type: Boolean,
      default: true
    },
    showMinute: {
      // 是否显示分钟
      type: Boolean,
      default: true
    },
    showSecond: {
      // 是否显示秒数
      type: Boolean,
      default: true
    },
    showMillisecond: {
      // 是否显示毫秒
      type: Boolean,
      default: false
    },
    showPreZero: {
      // 是否前置补零
      type: Boolean,
      default: true
    },
    separatorType: {
      // 分隔符类型（1.空格 2.分号 3.中文）
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      varSwitchStatus: false, // 状态切换器（距开始剩余时间->距结束剩余时间）
      timer: null, // 定时器
      msTimer: null, // 毫秒定时器
      days: '0', // 天
      hours: '0', // 时
      minutes: '0', // 分
      second: '0', // 秒
      millisecond: '0', // 毫秒
      msForCount: 9, // 用于毫秒倒计时的数值
      separatorObj: {
        // 分隔符
        1: ['', '', '', ''],
        2: [':', ':', ':', ''],
        3: ['天', '时', '分', '秒']
      }
    }
  },
  methods: {
    // 重置数据
    resetData () {
      clearInterval(this.timer)
      clearInterval(this.msTimer)
      this.timer = null
      this.msTimer = null
      if (this.showPreZero) {
        this.days = '00'
        this.hours = '00'
        this.minutes = '00'
        this.second = '00'
        this.millisecond = '0'
      } else {
        this.days = '0'
        this.hours = '0'
        this.minutes = '0'
        this.second = '0'
        this.millisecond = '0'
      }
    },
    /**
     * @description 数字前置补零
     * @param [Number] 待补零数字
     */
    addPreZero (num) {
      return num < 10 ? '0' + num : num
    },
    // 处理倒计时切换（即将开始->距结束剩余时间）
    handleSwitchStatus () {
      let rest = -1
      if (this.endTime !== -1) {
        // 通过结束时间和当前时间计算出剩余时间
        rest = parseInt((this.endTime - new Date().getTime()) / 1000)
      }

      if (rest === -1) {
        console.log('缺少参数：endTime')
        return
      }

      this.calculateTime(rest)
      this.msCountDown()
      this.countDown(rest)
    },
    // 处理倒计时结束
    handleCountDownEnd () {
      this.$emit('countDownEnd')
      if (this.varSwitchStatus) {
        this.varSwitchStatus = false
        this.handleSwitchStatus()
      }
    },
    /**
     * @description 倒计时时间换算
     * @param [Number] 剩余时间（单位秒s）
     */
    calculateTime (rest) {
      rest = parseInt(rest)
      let day = parseInt(rest / SECONDS_IN_DAY)
      let hour = parseInt((rest - day * SECONDS_IN_DAY) / SECONDS_IN_HOUR)
      let minute = parseInt((rest - day * SECONDS_IN_DAY - hour * SECONDS_IN_HOUR) / SECONDS_IN_MINTUE)
      let second = parseInt(rest - day * SECONDS_IN_DAY - hour * SECONDS_IN_HOUR - minute * SECONDS_IN_MINTUE)

      this.days = this.addPreZero(day)
      this.hours = this.addPreZero(hour)
      this.minutes = this.addPreZero(minute)
      this.second = this.addPreZero(second)
    },
    // 毫秒倒计时时间转换
    calculateMsTime () {
      this.msForCount = this.msForCount <= 0 ? 9 : (this.msForCount - 1)
      this.millisecond = this.msForCount
    },
    /**
     * @description 倒计时
     * @param [Number] 剩余时间（单位秒s）
     */
    countDown (rest) {
      if (rest <= 0) {
        this.resetData()
        this.handleCountDownEnd()
        return
      }

      this.timer = setInterval(() => {
        rest--
        this.calculateTime(rest)
        if (rest <= 0) {
          this.resetData()
          this.handleCountDownEnd()
        }
      }, 1000)
    },
    // 毫秒倒计时
    msCountDown () {
      if (!this.showMillisecond) return

      this.msTimer = setInterval(() => {
        this.calculateMsTime()
      }, 100)
    },
    // 初始化倒计时
    initCountDown () {
      let rest = -1
      if (this.restTime !== -1) {
        // 如果有restTime，则优先使用
        rest = this.restTime
      } else if (this.startTime !== -1) {
        // 如果有startTime，则使用
        // 通过开始时间和当前时间计算出剩余时间
        rest = parseInt((this.startTime - new Date().getTime()) / 1000)
      } else if (this.endTime !== -1) {
        // 如果有endTime，则使用
        // 通过结束时间和当前时间计算出剩余时间
        rest = parseInt((this.endTime - new Date().getTime()) / 1000)
      }

      if (rest === -1) {
        console.log('缺少参数：restTime | endTime | startTime 之一')
        return
      }

      this.calculateTime(rest)
      this.msCountDown()
      this.countDown(rest)
    },
    // 初始化数据
    initData () {
      this.varSwitchStatus = this.switchStatus
    }
  },
  created () {
    this.resetData()
    this.initData()
    this.initCountDown()
  }
}
</script>

<style scoped>
.count-down {
  display: inline-block;
}
.separator {
  font-style: normal;
}
</style>
