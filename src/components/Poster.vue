<template>
  <div id="poster">
    <div class="img-container">
      <img class="img-holder" />
    </div>

    <div class="canvas-container">
      <img class="bg" src="../assets/imgs/wheel.png">
      <img class="pointer" src="../assets/imgs/pointer-start.png">
      <p class="tips">我是文字啊啊啊</p>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  name: 'poster',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    let el = document.querySelector('.canvas-container')
    html2canvas(el, {
      // scale: 1.4,
      // useCORS: true
    }).then((canvas) => {
      let img = canvas.toDataURL()
      document.querySelector('.img-holder').src = img
    })
  }
}
</script>

<style scoped>
#poster .img-container .img-holder {
  width: 200px;
}
#poster .canvas-container {
  position: fixed;
  bottom: 0;
  width: 200px;
}
#poster .canvas-container img.bg {
  width: 200px;
  height: 200px;
}
#poster .canvas-container img.pointer {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
