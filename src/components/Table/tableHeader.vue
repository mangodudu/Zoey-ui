<!--
 * @Author: zoey
 * @Date: 2023-11-17 20:30:57
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-20 22:04:59
 * @Description: 请填写简介
-->
<template>
  <table class="zoey-table_header">
    <colgroup>
      <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
    </colgroup>
    <thead>
      <th v-for="(item,index) in columns" :key="index">
        <div class="cell" v-if="!item.type">{{ item.label }}</div>
        <div class="cell" v-if="item.type==='selection'">
          <input ref="checkbox" type="checkbox" class="selection" :id="index" name='selection'
            @change="e=>selectionChange(e)" />
        </div>
      </th>
    </thead>
  </table>
</template>
<script>
  import { ref } from 'vue'
  export default {
    name: 'TableHeader',
    props: {
      store: {
        default: {}
      }
    },
    computed: {
      columns() {
        return this.store.state.columns
      },
      checkboxIndeterminate() {
        return this.store.state.checkboxIndeterminate
      },
      isAllchecked() {
        return this.store.state.isAllchecked
      },
      isNoneChecked() {
        return this.store.state.isNoneChecked
      }
    },
    watch: {
      checkboxIndeterminate(newVal) {
        this.CheckboxIndeterminate(newVal)
      },
      isAllchecked(newVal) {
        if (newVal) {
          this.setChecked()
        }
      },
      isNoneChecked(newVal) {
        if (newVal) {
          this.setdischecked()
        }
      }
    },
    methods: {
      selectionChange(e) {
        const value = e.target.checked
        if (value) {
          this.store.commit('selectAll')
          if (this.store.state.selectedColumns.size === this.store.state.data.length) {
            this.$parent.selectAll(this.store.state.selectedColumns)
          }
        } else {
          this.store.commit('selectNone')
        }
      }
    },
    setup() {
      let checkbox = ref(null)

      function CheckboxIndeterminate(val) {
        checkbox.value[0].indeterminate = val
      }
      function setChecked() {
        checkbox.value[0].checked = true
      }
      function setdischecked() {
        checkbox.value[0].checked = false
      }
      return {
        checkbox,
        CheckboxIndeterminate,
        setChecked,
        setdischecked,
      }
    }
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

        .selection {
          width: 100%;
          background-color: initial;
          cursor: default;
          appearance: checkbox;
          box-sizing: border-box;
          padding: initial;
          border: initial;
        }
      }
    }
  }
</style>