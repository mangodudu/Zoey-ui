<!--
 * @Author: zoey
 * @Date: 2023-11-16 22:12:02
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-19 21:47:21
 * @Description: 请填写简介
-->
<!--
 * @Author: zoey
 * @Date: 2023-11-16 22:00:43
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-16 22:06:32
 * @Description: 请填写简介
-->
<template>
  <div class="zoey-table_wrapper" :style="myStyle">
    <table>
      <!-- 隐藏列 -->
      <div class="hidden-columns">
        <slot></slot>
      </div>
      <!-- 表头 -->
      <div class="zoey-table_header-wrapper">
        <table-header :store="store"></table-header>
      </div>
      <!-- 表体 -->
      <div class="zoey-table_body-wrapper">
        <table-body :store="store" :stripe="stripe"></table-body>
      </div>
    </table>
  </div>
</template>
<script>
  import TableStore from './table.store.js'
  import TableHeader from './tableHeader.vue'
  import TableBody from './tableBody.vue'
  export default {
    name: 'ZoeyTable',
    props: {
      data: {
        type: Array,
        require: true
      },
      stripe: {
        type: Boolean,
        default: false
      },
      height: {
        type: String, Number
      }
    },
    data() {
      return {
        store: new TableStore()

      }
    },
    components: {
      TableHeader,
      TableBody
    },
    watch: {
      data: {
        immediate: true,
        handler(value) {
          this.store.commit('setTableData', value)
        }
      }
    },
    computed: {
      myStyle() {
        if (this.height) {
          return {
            '--height': this.height + 'px'
          }
        } else {
          return {
            '--height': '100%'
          }
        }
      }
    },
    methods: {
    },
  }
</script>
<style lang="less" scoped>
  .zoey-table_wrapper {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: #303133;

    table {
      table-layout: fixed;

      .hidden-columns {
        display: none;
      }

      .zoey-table_header-wrapper {}

      .zoey-table_body-wrapper {
        height: var(--height);
        overflow: auto;
      }
    }
  }
</style>