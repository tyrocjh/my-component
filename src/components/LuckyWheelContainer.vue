<template>
  <div class="lucky-wheel-container">
    <LuckyWheel
      @handleShowModal="handleShowModal"
      :resultAngle="resultAngle" />
  </div>
</template>

<script>
import LuckyWheel from './LuckyWheel'

export default {
  name: 'lucky-wheel-container',
  components: {
    LuckyWheel
  },
  data () {
    return {
      resultAngle: [315, 270, 225, 180, 135, 90, 45, 0] // 根据返回的奖品下标，决定旋转停止时所处的弧度
    }
  },
  methods: {
    // 处理抽奖弹窗
    handleShowModal () {
      alert('抽到啦~')
    }
  },
  created () {
  }
}
</script>

<style scoped>
</style>
