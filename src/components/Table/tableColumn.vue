<!--
 * @Author: zoey
 * @Date: 2023-11-16 22:13:37
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-19 21:53:42
 * @Description: 请填写简介
-->
<template>
  <div></div>
</template>
<script>
  export default {
    name: 'ZoeyTableColumn',
    props: {
      prop: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      width: {
        type: String
      },
      fixed: {
        type: [Boolean, String],
        default: false,
        validator(value) {
          return ['left', 'right', true, false].includes(value)
        }
      }
    },
    data() {
      return {
        columnConfig: {}
      }
    },
    created() {
      let column = {
        label: this.label,
        prop: this.prop,
        width: this.width,
        isFixed: this.fixed
      }
      this.columnConfig = column
    },
    mounted() {
      this.owner.store.commit('insertColumn', this.columnConfig)
    },
    computed: {
      owner() {
        return this.$parent;
      }
    },
    methods: {
    },
  }
</script>
<style lang="less" scoped>

</style>