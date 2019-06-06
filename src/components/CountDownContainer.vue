<template>
  <div class="count-down-container">
    <div class="cont">
      <CountDown
        :restTime="123630"
        :showDay="true"
        :showMillisecond="true"
        :separatorType="3"
      />
    </div>

    <div class="cont">
      <CountDown
        :restTime="0"
        :showDay="true"
        :showMillisecond="true"
        :separatorType="3"
      />
    </div>

    <div class="cont">
      <CountDown
        :restTime="37230"
        :showMillisecond="true"
        :separatorType="2"
      />
    </div>

    <div class="cont">
      <CountDown
        :restTime="1230"
        :separatorType="3"
      />
    </div>

    <div class="cont">
      <CountDown
        :restTime="1230"
        :showHour="false"
        :separatorType="2"
      />
    </div>

    <div class="cont">
      <CountDown
        :restTime="7"
        :showMillisecond="true"
        @countDownEnd="handleCountDownEnd()"
      />
    </div>

    <div class="cont">
      <CountDown
        :restTime="0"
        :showMillisecond="true"
        @countDownEnd="handleCountDownEnd()"
      />
    </div>

    <div class="cont">
      <CountDown
        :endTime="1540452520193"
        :showDay="true"
        :showMillisecond="true"
        :separatorType="2"
      />
    </div>

    <div class="cont">
      <CountDown
        :endTime="0"
        :showDay="true"
        :showMillisecond="true"
        :separatorType="2"
        @countDownEnd="handleCountDownEnd()"
      />
    </div>

    <div class="cont">
      <CountDown
        :startTime="1540452520193"
        :showDay="true"
        :showMillisecond="true"
        :separatorType="2"
      />
    </div>

    <div class="cont">
      <CountDown
        :switchStatus="true"
        :startTime="1540367745678"
        :endTime="1540367845678"
        :showDay="true"
        :showMillisecond="true"
        :separatorType="2"
      />
    </div>
  </div>
</template>

<script>
import CountDown from './CountDown'

export default {
  name: 'count-down-container',
  components: {
    CountDown
  },
  data () {
    return {
    }
  },
  methods: {
    handleCountDownEnd () {
      console.info('count down end...')
    }
  }
}
</script>

<style scoped>
.cont {
  margin-top: 10px;
}
</style>
