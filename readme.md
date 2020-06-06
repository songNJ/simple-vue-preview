# Vue preview plugin

> 一款基于vue的图片预览插件,支持放大、缩小、旋转等功能，无需传入宽高。

## Demo

## Installation

``` bash
npm i simple-vue-preview -S
```

## Usage

Notice:
 - This plugin currently support vue2.5 and above


### Install plugin

``` javascript
// 局部引入
import preview from 'simple-vue-preview'

// 全局引入
Vue.use(preview)
```

### 组件式

```html
<template>
  <vue-preview :data="data" @close="handleClose"></vue-preview>
</template>

<script>
  export default {
    data () {
      return {
        data: [
          {
            url: '',
            title: '图片1',
          },
          {
            url: '',
            title: '图片2',
          }
        ]
      }
    },
    methods: {
      handleClose () {
        console.log('close event')
      }
    }
  }
</script>
```

### 组件式
``` javascript
// 局部引入
import preview from 'simple-vue-preview'

preview({
  data: this.data,
  scale: 0.5,
  rotate: 90
})

//全局引入
this.$preview({
  data: this.data,
  scale: 0.5,
  rotate: 90
})

```

### Prop

##### slide item options

|  Property | Description
| :---  | :---
| data  | url and title[]
| scale  | 放大缩小比例,默认1.5
| rotate  | 旋转比例,默认+90

### Events

|  Event name | Description | parameter
| :---  | :--- | :---
| close   | close gallery | nothing

