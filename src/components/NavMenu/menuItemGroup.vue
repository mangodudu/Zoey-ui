<!--
 * @Author: zoey
 * @Date: 2023-12-12 18:38:59
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-14 17:02:57
 * @Description: 请填写简介
-->
<template>
   <div class="menu-item-group">
      <div class="menu-item-group-title">
         <slot name="title"></slot>
         <div v-if="title">{{title}}</div>
      </div>
      <div class="menu-item-group-content">
         <slot></slot>
      </div>
   </div>
</template>
<script>
   export default {
      name: 'ZoeyMenuItemGroup',
      props: {
         index: {
            type: String,
            default: null,
            require: true
         },
         title: {
            type: String,
            default: null
         }
      },
      data() {
         return {
         }
      },
      created() {
      },
      computed: {
      },
      methods: {
      },
   }
</script>
<style lang="less" scoped>
   .menu-item-group {
      .menu-item-group-title {
         font-size: 12px;
         color: #909399;
         padding: 7px 0;

      }

      .menu-item-group-content {
         /* /deep/ .menu-item-contianer {
            height: 56px;
            position: relative;
            line-height: 56px;
            text-align: left;
         } */
      }
   }
</style>