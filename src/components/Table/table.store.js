/*
 * @Author: zoey
 * @Date: 2023-11-17 19:20:34
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-17 20:47:39
 * @Description: 请填写简介
 */
class TableStore {
  constructor() {
    this.state = {
      tableData: null,
      columns: []
    }
  }
  commit(name, ...args) {
    this.mutation[name].apply(this, [this.state].concat(args))
  }
}
TableStore.prototype.mutation = {
  setTableData(state, data) {
    state.data = data
  },
  insertColumn(state, column) {
    state.columns.push(column)
  }
}
export default TableStore