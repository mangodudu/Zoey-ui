<!--
 * @Author: zoey
 * @Date: 2023-11-20 19:10:15
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-20 19:47:39
 * @Description: 请填写简介
-->
<template>
    <div id="goTop">
      <div class="top-btn" v-show="visiable" @click="handleScrollTop">
        <zoey-button type="primary" icon="zoey-icon-top" circle></zoey-button>
      </div>
    </div>
</template>
<script>
export default {
  name:'ZoeyGoTop',
   data() {
      return {
        scrollTop:null,
        visiable:false
      }
   },
   mounted(){
    window.addEventListener('scroll',this.handleScroll)
   },
   unmounted(){
    window.removeEventListener('scroll',this.handleScroll)
   },
   computed:{
   },
   methods:{
    handleScroll(){
      this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop
      if(this.scrollTop>500){
        this.visiable=true
      }else{
        this.visiable=false
      }
    },
    handleScrollTop(){
      let timer=null,
      that=this
      cancelAnimationFrame(timer)
      timer=requestAnimationFrame(function fn(){
        if(that.scrollTop>0){
          that.scrollTop-=50
          document.body.scrollTop=document.documentElement.scrollTop=that.scrollTop;
          timer=requestAnimationFrame(fn)
        }else{
          cancelAnimationFrame(timer);
          that.visiable=false
        }
      })
    }
   },
}
</script>
<style lang="less" scoped>
.top-btn{
  position: fixed;
  right: .40rem;
  bottom: 1rem;
}
</style>
