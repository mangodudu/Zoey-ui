<!--
 * @Author: zoey
 * @Date: 2023-11-17 20:30:57
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-19 21:42:52
 * @Description: 请填写简介
-->
<template>
  <table class="zoey-table_header">
    <colgroup>
      <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
    </colgroup>
    <thead>
      <th v-for="(item,index) in columns" :key="index">
        <div class="cell">{{ item.label }}</div>
      </th>
    </thead>
  </table>
</template>
<script>
  export default {
    name: 'TableHeader',
    props: {
      store: {
        default: {}
      }
    },
    data() {
      return {
      }
    },
    created() {
    },
    computed: {
      columns() {
        return this.store.state.columns
      }
    },
    methods: {
    },
  }
</script>
<style lang="less" scoped>
  thead {
    color: #909399;

    th {
      white-space: nowrap;
      overflow: hidden;
      user-select: none;
      text-align: left;

      div {
        display: inline-block;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 40px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .cell {
        position: relative;
        word-wrap: normal;
        text-overflow: ellipsis;
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        box-sizing: border-box;

        &.highlight {
          color: #409EFF;
        }
      }
    }
  }
</style>