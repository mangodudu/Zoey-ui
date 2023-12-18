<!--
 * @Author: zoey
 * @Date: 2023-12-12 13:26:18
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-12 15:53:36
 * @Description: 请填写简介
-->
<template>
    <div class="bread-crumbs">
      <slot ></slot>
      <div>{{ separatorClass }}</div>
      <div>{{ separator }}</div>
    </div>
</template>
<script>
import {h} from 'vue'
export default {
  name:'ZoeyBreadcrumb',
  props:{
    separator:{
      type:String,
      default:'/'
    },
    separatorClass:{
      type:String,
    }
  },
  setup(props,{slots}){
    return ()=>{
      const slotItems=slots.default();
      const dymanicItems=[]
      slotItems.forEach((item,i)=>{
        dymanicItems.push(item)
        if(i<(slotItems.length-1)){
          if(!props.separatorClass){
          dymanicItems.push(h('span',{class:'bread-crumb-separator',innerHTML:props.separator}))
        }else{
          dymanicItems.push(h('i',{class:['bread-crumb-separator',props.separatorClass]}))
        }
        }
      })

      return  h('div',{class:'bread-crumbs'},dymanicItems)
    }
  },
}
</script>
<style lang="less" scoped>
.bread-crumbs{
  display: flex;
  flex-direction: row;
  padding: 25px 10px;
  font-size: 14px;
  :deep(&-item){
    a{
      font-weight: bold;
      text-decoration: none;
      color:#000 ;
      transition: all 0.4s;
      &:hover{
        color:#409eff;
      }
    }
  }
  :deep(.bread-crumb-separator){
    font-style: normal;
    font-size: 12px;
    margin-left:6px ;
    margin-right: 6px;
    line-height: 22px;
    color: #CBCFD5;
  }
}
</style>
