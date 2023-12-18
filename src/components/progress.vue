<!--
 * @Author: zoey
 * @Date: 2023-12-09 14:06:21
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-09 16:24:42
 * @Description: 请填写简介
-->
<template>
    <div class="zoey-progress">
      <div class="progress-bar">
        <div class="progress-bar-outer"  :style="progressouterStyle">
          <div class="progress-bar-inner" :style="{backgroundColor:this.currColor,width:Math.ceil((this.percentage)/100*this.height)+'px',borderRadius:Math.ceil(this.strokeWidth/2)+'px'}">
            <div v-if="textInside" class="progress-bar-innerText">{{ innerText }}</div>
        </div>
        </div>
        <div class="pregress-text">
          <div class="progress-percentText">{{ innerText }}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name:'ZoeyProgress',
  props:{
    percentage:{
      type:[String,Number],
      required:true,
      validator(value){
        let num;
        if(typeof value ==='string'){
          num=parseInt(value)
        }else{
          num=value
        }
        return num>=0&&num<=100
      }
    },
    type:{
      type:String,
      default:'line',
      validator(value){
        return ['line','circle','dashboard','line'].includes(value)
      }
    },
    height:{
      type:Number,
      default:350
    },
    width:{
      type:Number,
      default:126
    },
    strokeWidth:{
      type:Number,
      default:6
    },
    textInside:{
      type:Boolean,
      default:false
    },
    status:{
      type:String,
      default:'',
      validator(value){
        return ['','success','exception','warning'].includes(value)
      }
    },
    color:{
      type:[String,Function,Array],
      default:'#409EFF',
      validator(value){
        if(typeof value==String){
          var s=new Option().style;
        s.color=value;
        return s.color==value
        }else{
          
          return true
        }
      }
    },
    defineBackColor:{
      type:String,
      default:"#EBEEF5"
    },
    format:{
      type:Function,
      default:(percentage)=>{
        return percentage+'%'
      }
    }
  },
   data() {
      return {
        progressouterStyle:{
          width:this.height+'px',
          height:this.strokeWidth+'px',
          borderRadius:Math.floor(this.strokeWidth/2)+'px',
          backgroundColor:this.defineBackColor
        },
      }
   },
   created(){
   },
   computed:{
    innerText(){
      return this.format(this.percentage)
    },
    currColor(){
      if(typeof this.color==='string') return this.color
      else if(typeof this.color=='object'){
        let preColor=''
        for(let colorItem of this.color){
          if(colorItem.percentage>this.percentage){
            return preColor
          }
          else{
            preColor=colorItem.color
          }
        }
      }else{
        return this.color(this.percentage)
      }
      return true
    }
   },
   methods:{
   },
}
</script>
<style lang="less" scoped>
.zoey-progress{
  .progress-bar{
    display: inline-block;
    vertical-align: middle;
    margin-right:-55px ;
    position: relative;
    .progress-bar-outer{
      display: inline-block;
      .progress-bar-inner{
        position: relative;
        height: 100%;
        .progress-bar-innerText{
          position: absolute;
          top:50%;
          right: 0;
          transform: translate(-20%,-50%);
          font-size: 12px;
          color: #606266;
        }
      }
    }
    .pregress-text{
      position: absolute;
      top: 50%;
      right: -15%;
      transform: translate(-50%,-40%);
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
    }
  }
}
</style>
