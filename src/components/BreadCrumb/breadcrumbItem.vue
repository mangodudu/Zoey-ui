<!--
 * @Author: zoey
 * @Date: 2023-12-12 13:26:40
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-12 15:52:06
 * @Description: 请填写简介
-->
<template>
    <div class="bread-crumbs-item">
      <RouterLink v-if="to" :to="to" class="bread-crumbs-item-link"><slot></slot></RouterLink>
      <span v-else>
        <slot></slot>
      </span>
    </div>
</template>
<script>
export default {
  name:'ZoeyBreadcrumbItem',
  props:{
    to:{
      type:[String,Object]
    }
  }
}
</script>
<style lang="less" scoped>
.bread-crumbs-item-link{
  font-weight: bold;
      text-decoration: none;
      color:#000 ;
      transition: all 0.4s;
      &:hover{
        color:#409eff;
      }
}
</style>
