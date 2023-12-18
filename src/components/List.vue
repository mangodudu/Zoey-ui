<!--
 * @Author: zoey
 * @Date: 2023-11-14 10:03:52
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-14 19:22:26
 * @Description: 请填写简介
-->
<template>
  <div class="container" :style="{height:containerHeight}" @scroll="handleScroll" ref="container">
    <!-- 数据列表 -->
    <div class="list" :style="{top:listTop}">
      <!-- 列表项 -->
      <div v-for="item in showData" :key="item.id" :style="{height:size+'px'}">
        {{ item.content }}
      </div>
    </div>
    <!-- 用于撑开高度的元素 -->
    <div class="bar" :style="{height:barHeight}"></div>
  </div>
</template>
<script>
  export default {
    name: 'ZoeyList',
    props: {
      items: {
        type: Array,
      },
      size: {
        default: '50'
      },
      shownumber: {
        default: '10'
      }
    },
    data() {
      return {
        start: 0,//展示数据的起始下标
        end: this.shownumber//要展示的数据的结束下标
      }
    },
    created() {
    },
    computed: {
      showData() {
        return this.items.slice(this.start, this.end)
      },
      //容器高度
      containerHeight() {
        return this.size * this.shownumber + 'px'
      },
      //撑开容器内容高度的元素的高度
      barHeight() {
        return this.size * this.items.length + 'px'
      },
      //列表上滚动改变元素的值
      listTop() {
        return this.start * this.size + 'px'
      }
    },
    methods: {
      handleScroll() {
        //获取容器顶部的滚动尺寸
        const scrollTop = this.$refs.container.scrollTop
        this.start = Math.floor(scrollTop / this.size)
        this.end = this.start + this.shownumber
      },
    },
  }
</script>
<style lang="less" scoped>
  .container {
    overflow-y: scroll;
    background-color: rgb(150, 150, 150, .5);
    font-size: 20px;
    font-weight: bold;
    line-height: 60px;
    width: 500px;
    margin: 0 auto;
    position: relative;
    text-align: center;
  }

  .list {
    position: absolute;
    top: 0;
    width: 100%;
  }
</style>