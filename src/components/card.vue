<!--
 * @Author: zoey
 * @Date: 2023-12-12 16:12:08
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-12 18:25:14
 * @Description: 请填写简介
-->
<template>
<div></div>
</template>
<script>
import {h} from 'vue'
export default {
  name:'ZoeyCard',
  props:{
    bodyStyle:{
      type:[Object,String],
      default:()=>{
        return {padding:'20px'}
      }
    }
  },
  setup(props,{slots}){
    const defaultSlot=slots.default();
    const cardContent=h('div',{
      class:'card-content',
      style:props.bodyStyle
    },defaultSlot);
    return ()=>{
      if(!slots.header){
        return h('div',{
      class:'card-contianer'
    },cardContent);
      }else{
        const cardHeader=h('div',{
          class:'card-header'
        },slots.header())
        return h('div',{
          class:'card-contianer'
        },[cardHeader,cardContent])
      }
    }
  }
}
</script>
<style lang="less" scoped>
.card-contianer{
  border-radius: 4px;
  border:1px solid #ebeef7;
  overflow: hidden;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0px 2px 12px 0px rgba(0,0,0,.1);
  .card-header{
    padding: 18px 20px;
    border:1px solid #ebeef7;
    font-style: normal;
        font-size: 16px;
  }

}
</style>
