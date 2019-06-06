<template>
  <div class="vertical-scroll-container">
    <VerticalScroll :handleAdjustOrder="adjustOrder" :scrollable="scrollable" :scrollInterval="scrollInterval">
      <div slot="scroll-content">
        <div v-for="(item, idx) in msgList" :key="idx">
          <span>{{item.msg}}</span>
        </div>
      </div>
    </VerticalScroll>
  </div>
</template>

<script>
import VerticalScroll from './VerticalScroll'

export default {
  name: 'vertical-scroll-container',
  components: {
    VerticalScroll
  },
  data () {
    return {
      msgList: [], // 消息列表
      scrollInterval: 2000, // 每隔多少毫秒滚动一次
      scrollable: true // 是否开启滚动（当列表数量为1的时候就不用开启啦~）
    }
  },
  methods: {
    // 调整列表数组
    adjustOrder () {
      this.msgList.push(this.msgList[0])
      this.msgList.shift()
    },
    // 获取列表数据
    getUserList () {
      this.msgList = [{
        id: 1,
        msg: '为驱蚊器翁请问请问'
      }, {
        id: 2,
        msg: '按时打算的撒的撒'
      }, {
        id: 3,
        msg: '在小程序注册自行车自行车行'
      }, {
        id: 4,
        msg: '电饭锅电饭锅电饭锅电饭锅'
      }, {
        id: 5,
        msg: '努力变送我的我的请问啊'
      }]
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style scoped>
.vertical-scroll-container {
  position: relative;
  overflow: hidden;
  margin-top: 50px;
  height: 24px;
}
</style>
