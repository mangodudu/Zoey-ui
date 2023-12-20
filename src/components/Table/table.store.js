/*
 * @Author: zoey
 * @Date: 2023-11-17 19:20:34
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-20 22:01:16
 * @Description: 请填写简介
 */
class TableStore {
  constructor() {
    this.state = {
      data: null,
      columns: [],
      selectedColumns: new Map(),
      checkboxIndeterminate: false,
      isAllchecked: false,
      isNoneChecked: true,
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
    //console.log("column:", column)
  },
  insertSelectedColumn(state, rowIndex) {
    state.isNoneChecked = false
    if (!state.selectedColumns.has(rowIndex)) {
      state.selectedColumns.set(rowIndex, state.data[rowIndex - 1])
    }
    if (this.mutation) {
      if (!this.mutation.isSelectedAll(state)) {
        state.checkboxIndeterminate = true
      }
    } else {
      if (!this.isSelectedAll(state)) {
        state.checkboxIndeterminate = true
      }
    }
  },
  deleteSelectedColumn(state, rowIndex) {
    if (state.selectedColumns.has(rowIndex)) {
      state.selectedColumns.delete(rowIndex)
    }
    if (!this.mutation.isSelectedAll(state) && state.selectedColumns.size) {
      state.checkboxIndeterminate = true
    }
  },
  getSelectedColumnByRow(state, rowIndex) {
    if (state.selectedColumns.has(rowIndex)) {
      return state.selectedColumns.get(rowIndex)
    } else {
      return null
    }
  },
  selectAll(state) {
    if (!this.mutation.isSelectedAll(state)) {
      const len = state.data.length
      for (let i = 0; i < len; i++) {
        this.mutation.insertSelectedColumn(state, i + 1)
      }
    }
  },
  selectNone(state) {
    state.isAllchecked = false
    state.checkboxIndeterminate = false
    state.isNoneChecked = true
    state.selectedColumns.clear()
  },
  isSelectedAll(state) {
    if (state.selectedColumns.size === state.data.length) {
      state.isAllchecked = true
      state.checkboxIndeterminate = false
      return true
    } else {
      state.isAllchecked = false
      return false
    }
  },
  setcheckboxIndeterminateFalse(state) {
    state.checkboxIndeterminate = false
  }
}
export default TableStore