<template>
  <table :class="['zoey-table_body',{'is-stripe':stripe}]">
    <colgroup>
      <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
    </colgroup>
    <tbody>
      <tr v-for="(item,index) in tableData" :key="index">
        <td v-for="(prop,index) in columnsProp " :key="index">{{item[prop]}}</td>
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
    mounted() {
    },
    created() {
    },
    computed: {
      tableData() {
        return this.store.state.data
      },
      columns() {
        return this.store.state.columns
      },
      columnsProp() {
        const columnsProp = this.columns.map((column) => {
          return column['prop']
        })
        return columnsProp
      }
    },
    watch: {
    },
    methods: {
      setcolumnsProp() {
        const columnsProp = this.columns.map((column) => {
          return column['prop']
        })
        console.log(columnsProp)
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