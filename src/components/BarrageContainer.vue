<template>
  <div class="barrage-container">
    <!-- <Barrage
      v-if="barrageObjList.length"
      :list="barrageObjList"
      :channelCount="barrageLineCount"
      :speed="barrageSpeed"
      :loop="barrageLoop" />

    <div class="mt200">
      <Barrage
        v-if="barrageObjList.length"
        :list="barrageObjList"
        :channelCount=4
        :channelOrder=[1,4,2,3]
        :speed=0.8
        :loop="barrageLoop" />
    </div> -->

    <Barrage
      v-if="barrageObjList.length"
      :list="barrageObjList"
      :speed=1
      :channelCount=4
      :channelOrder=[1,4,2,3]
      :intelligent=true
      :loop="barrageLoop" />
  </div>
</template>

<script>
import Barrage from './Barrage'

export default {
  name: 'barrage-container',
  components: {
    Barrage
  },
  data () {
    return {
      barrageObjList: [], // 弹幕对象列表
      barrageLineCount: 2, // 弹幕行数
      barrageSpeed: 2, // 每隔多少秒放入一条弹幕
      barrageLoop: true // 弹幕是否无限循环滚动
    }
  },
  methods: {
    setBarrageObjList () {
      setTimeout(() => {
        this.barrageObjList = this.barrageObjList.concat([{
          id: 1,
          msg: '阿萨德按时达到阿萨德'
        }, {
          id: 2,
          msg: '阿萨德阿达'
        }, {
          id: 3,
          msg: '下自成蹊阿萨德啊大神大阿萨德'
        }, {
          id: 4,
          msg: '请问驱蚊器翁请问请问'
        }, {
          id: 5,
          msg: '啊啊啊啊'
        }, {
          id: 6,
          msg: '擦擦擦多吃点萨达'
        }, {
          id: 7,
          msg: '认购人反而达到萨达萨达阿'
        }, {
          id: 8,
          msg: '凄凄切切群'
        }, {
          id: 9,
          msg: '嗯嗯嗯嗯嗯嗯嗯阿萨德'
        }])
      }, 0)
    }
  },
  created () {
    this.setBarrageObjList()
    this.$toast('你愁啥~？')
  }
}
</script>

<style scoped>
.mt200 {
  position: relative;
  margin-top: 200px;
}
</style>
