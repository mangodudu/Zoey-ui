<template>
  <table :class="['zoey-table_body',{'is-stripe':stripe}]">
    <colgroup>
      <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
    </colgroup>
    <tbody>
      <tr v-for="(item,preindex) in tableData" :key="preindex" @click="event=>rowClick(preindex,item,event)">
        <td v-for="(column,index) in columns" :key="index"
          @mouseenter="event=>cellMouseEnter(preindex+1, column, item[column.prop], event)"
          @mouseleave="event=>cellMouseLeave(preindex+1, column, item[column.prop], event)">
          <input class="selection" @change="e=>changeSelect(e,preindex)" v-if="column.type=='selection'" type="checkbox"
            :checked="isCheckedList[preindex]" />
          {{item[column.prop]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'TableBody',
    props: {
      store: {
        default: {}
      },
      stripe: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showData: [],
      }
    },
    computed: {
      tableData() {
        return this.store.state.data
      },
      columns() {
        return this.store.state.columns
      },
      isCheckedList() {
        let res = new Array(this.tableData.length)
        this.store.state.selectedColumns.forEach((value, key) => {
          res[key - 1] = true
        });
        return res
      }
    },
    methods: {
      setcolumnsProp() {
        const columnsProp = this.columns.map((column) => {
          return column['prop']
        })
        console.log(columnsProp)
      },
      changeSelect(e, preIndex) {
        const changeValue = e.target.checked
        if (changeValue) {
          this.store.commit('insertSelectedColumn', preIndex + 1)
          this.$parent.select(preIndex + 1)
          if (this.store.state.selectedColumns.size === this.store.state.data.length) {
            this.$parent.selectAll(this.store.state.selectedColumns)
          }
        } else {
          this.store.commit('deleteSelectedColumn', preIndex + 1)
        }
      },
      rowClick(preindex, item, event) {
        if (typeof this.$parent.rowClick === 'function') {
          this.$parent.rowClick(preindex, item, event)
        }
      },
      cellMouseEnter(row, column, cell, event) {
        this.$parent.cellMouseEnter(row, column, cell, event)

      },
      cellMouseLeave(row, column, cell, event) {
        this.$parent.cellMouseLeave(row, column, cell, event)
      },
    },
  }
</script>
<style lang="less" scoped>
  tr,
  td {
    padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    margin: 0 auto;

  }

  .zoey-table_body {
    border-collapse: collapse;
    width: 100%;

    tr {
      border: 1px solid #f5f7fa;
      border-left: none;
      border-right: none;

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

  .zoey-table_body tbody tr:hover td {
    background: #F5F7FA;
  }

  /* stripe属性 */
  .zoey-table_body.is-stripe {

    border-spacing: 0;

    tbody {
      tr:nth-child(2n) {
        background-color: #FAFAFA;
      }

      tr:nth-child(2n+1) {
        background-color: #FFFFFF;
      }
    }
  }
</style>