<template>
  <div id="canvas-base">
    <canvas id="my-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'canvas-base',
  data () {
    return {}
  },
  methods: {
    draw() {
      let can = document.getElementById("my-canvas");
      let ctx = can.getContext("2d");
      can.setAttribute("width", 375 * 2);
      can.setAttribute("height", 600 * 2);
      can.style.width = "375px";
      can.style.height = "600px";
      ctx.scale(2, 2)
      ctx.lineWidth = 1;
      ctx.fillStyle = 'black';
      ctx.strokeStyle="#000000";
      ctx.fillRect(0, 0, 375, 600);

      ctx.fillStyle = 'white';
      ctx.strokeStyle = "#ffffff";

      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(150, 10);
      ctx.arcTo(180, 10, 180, 20, 10);
      ctx.arcTo(180, 40, 150, 40, 10);
      ctx.lineTo(10, 40);
      ctx.fill();
      ctx.closePath();

      ctx.moveTo(150, 50);
      ctx.lineTo(50, 50);
      ctx.arcTo(30, 50, 30, 70, 20);
      ctx.arcTo(30, 90, 50, 90, 20);
      ctx.lineTo(150, 90);
      ctx.fill();
      ctx.closePath();

      // var canvasTemp = document.createElement('canvas');
      // var contextTemp = canvasTemp.getContext('2d');
      // canvasTemp.width = shareW;
      // canvasTemp.height = shareH;
      // contextTemp.drawImage(goodsImg, moveLeft, mt, dWidth, dHeight);
      // var pattern = ctx.createPattern(canvasTemp, 'no-repeat');
      // drawRoundedRect(ctx, moveLeft, mt, dWidth, dHeight, pxFixed(30), false, false);
      // ctx.fillStyle = pattern;
      // ctx.fill();

      // ctx.beginPath();
      // ctx.fillStyle = 'grey';
      // ctx.arc(100, 100, 50, 0, Math.PI * 2, true);    
      // ctx.fill();
      // ctx.restore();
      // ctx.beginPath();
      // ctx.moveTo(80, 50);
      // ctx.arcTo(55, 55, 50, 80, 30);
      // ctx.arcTo(55, 55, 80, 50, 45);
      // ctx.fill();
      // ctx.restore();
    }
  },
  mounted() {
    this.draw()
  }
}
</script>

<style scoped>
#my-canvas {
}
</style>
