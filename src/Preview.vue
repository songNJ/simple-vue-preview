<template>
  <div class="preview" v-if="show">
    <div class="preview-header">
      <div class="preview-header-left">{{ this.current + 1 }}/{{ this.data.length }}</div>
      <div class="preview-header-center">{{ title }}</div>
      <div class="preview-header-right" @click="closed">
        <img src="./images/times.png" style="width:26px;" alt="">
      </div>
    </div>
    <div class="preview-bottom">
      <img src="./images/arrow-left.png" @click="last" type="arrow-left" style="width:26px;" />
      <img src="./images/arrow-right.png" @click="next" type="arrow-right" style="width:26px;" />
      <img src="./images/search-plus.png" @click="big" type="plus-circle" style="width:26px;" />
      <img src="./images/search-minus.png" @click="small" type="minus-circle" style="width:26px;" />
      <img src="./images/redo.png" @click="trans" type="redo" style="width:26px;" />
      <p></p>
    </div>
    <img
      class="preview-img"
      v-for="(item, index) in data"
      :key="index"
      draggable="false"
      :src="item.url"
      :style="styles[index]"
      @mousedown="mousedown"
      v-show="index === current"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      scales: [],
      rotates: [],
      current: 0,
      styles: []
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    scale: {
      type: Number,
      default: 1.5
    },
    rotate: {
      type: Number,
      default: 90
    },
    currents: {
      type: Number,
      default: 1
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.show = val
      },
      immediate: true
    },
    data: {
      handler(val) {
        val.forEach(({ url }, index) => {
          this.styles = this.styles.concat({})
          this.scales = this.scales.concat(1)
          this.rotates = this.rotates.concat(0)
          const image = new Image()
          image.src = url
          image.onload = e => this.imgLoad(e, index)
        })
      },
      immediate: true
    },
    currents: {
      handler(val) {
        this.current = val
      },
      immediate: true
    },
    scales: {
      handler() {
        this.$set(
          this.styles[this.current],
          'transform',
          `scale(${this.scales[this.current]}) rotate(${
            this.rotates[this.current]
          }deg)`
        )
      },
      deep: true
    },
    rotates: {
      handler() {
        this.$set(
          this.styles[this.current],
          'transform',
          `scale(${this.scales[this.current]}) rotate(${
            this.rotates[this.current]
          }deg)`
        )
      },
      deep: true
    }
  },
  computed: {
    title() {
      if (this.data[this.current]) {
        return this.data[this.current].title || '图片'
      } else {
        return '图片'
      }
    }
  },
  methods: {
    compute() {},
    closed() {
      this.show = false
      this.$emit('input', false)
      this.$nextTick().then(() => {
        this.$emit('close')
      })
    },
    imgLoad(e, index) {
      let { width, height } = e.path[0]
      const bodyW = document.body.offsetWidth
      const bodyH = document.body.offsetHeight

      if (width >= bodyW * 0.6) {
        width = bodyW * 0.6
      } else if (height >= bodyH * 0.6) {
        height = bodyH * 0.6
      }

      this.$set(this.styles[index], 'height', height + 'px')
      this.$set(this.styles[index], 'width', width + 'px')
      this.$set(this.styles[index], 'top', bodyH / 2 - height / 2 + 'px')
      this.$set(this.styles[index], 'left', bodyW / 2 - width / 2 + 'px')
    },
    big() {
      this.$set(
        this.scales,
        this.current,
        this.scales[this.current] * this.scale
      )
    },
    small() {
      if (this.scales[this.current] <= 1) return
      this.$set(
        this.scales,
        this.current,
        this.scales[this.current] / this.scale
      )
    },
    trans() {
      this.$set(
        this.rotates,
        this.current,
        this.rotates[this.current] + this.rotate
      )
    },
    mousedown(event) {
      const img = document.querySelectorAll('.preview-img')[this.current]
      const startX = event.clientX - img.offsetLeft
      const startY = event.clientY - img.offsetTop

      document.onmousemove = e => {
        const x = e.clientX - startX
        const y = e.clientY - startY
        this.$set(this.styles[this.current], 'top', y + 'px')
        this.$set(this.styles[this.current], 'left', x + 'px')
      }
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    last() {
      if (this.current > 0) {
        this.current--
      }
    },
    next() {
      if (this.current < this.data.length - 1) {
        this.current++
      }
    }
  }
}
</script>

<style scoped>
.preview * {
  user-select: none !important;
}

.preview {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
}

.preview-header {
  width: 100%;
  height: 40px;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  z-index: 99999;
}

.preview-img {
  position: absolute;
  z-index: 9999;
  cursor: pointer;
}

.preview-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  margin: 0 auto;
  display: flex;
  color: #fff;
  z-index: 99999;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  line-height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
}

.preview-bottom > * {
  padding: 0 12px;
}

.preview-bottom p {
  margin: 0;
  padding: 0;
  margin-left: 10px;
}
</style>
