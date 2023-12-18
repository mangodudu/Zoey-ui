<!--
 * @Author: zoey
 * @Date: 2023-12-11 13:04:28
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-11 21:33:37
 * @Description: 请填写简介
-->
<template>
    <div class="loading-warpper" :style="{backgroundColor:backgroundColor}">
      <div class="loading-content">
        <i :class="icon" class="loading-icon"></i>
      <div class="loading-text">{{title}}</div>
      </div>
    </div>
</template>
<script>
export default {
  name:'MyLoading',

   data() {
      return {
        title:'加载中',
        icon:'zoey-icon-loading',
        backgroundColor:'rgba(0, 0, 0, 0.8)',
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
    setTitle(val){
      this.title=val
    },
    setIcon(val){
    this.icon=val
    },
    setBackgroundColor(val){
      console.log("backgroundColor:",this.backgroundColor)
      this.backgroundColor=val
    }
   },
}
</script>
<style lang="less" scoped>
.loading-warpper{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.6;
  z-index: 99;
  .loading-content{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color:#409eff;
    .loading-icon{
      display: inline-block;
      margin-right:10px ;
      animation: circle 1s linear infinite;
    }
    @keyframes circle {
      0%{
        transform: rotate(0);
      }
      100%{
        transform: rotate(360deg);
      }
    }

    .loading-text{
      display: inline-block;
    }
  }
}
</style>
