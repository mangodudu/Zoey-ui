<!--
 * @Author: zoey
 * @Date: 2023-11-03 21:53:47
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-05 12:21:44
 * @Description: 请填写简介
-->
<template>
    <div class="zoey-input" :class="{'zoey-input_suffix':showSuffix}">
      <input :class="[`zoey-input_inner`,{'is-disabled':disable}]"
       :type='type' 
       :placeholder="placeholder"
       :name="name"
       :disabled="disable"
       :modelValue="modelValue"
       @input="handleInput">
       <span class="zoey-input_suffix" v-if="showSuffix">
        <i class="zoey-input_icon zoey-icon-cancel" v-if="clearable" @click="clear"></i>
        <i class="zoey-input_icon zoey-icon-visible" v-if="showPassword" @click="handlePassword"></i>
       </span>
    </div>
</template>
<script>
export default {
  name:'ZoeyInput',
  props:{
    placeholder:{
      type:String,
      default:''
        },
    type:{
      type:String,
      default:'text'
    },
    name:{
      type:String,
      default:''
    },
    disable:{
      type:Boolean,
      default:false
    },
    modelValue:{
      type:String,
      default:''
    },
    clearable:{
      type:Boolean,
      default:false
    },
    showPassword:{
      type:Boolean,
      default:false
    }
  },
   data() {
   },
   created(){
   },
   computed:{
    showSuffix(){
      return this.clearable||this.showPassword
    }
   },
   methods:{
    handleInput(e){
      this.$emit('update:modelValue',e.target.value)
    },
    clear(){
      this.$emit('update:modelValue','')
    }
   },
}
</script>
<style lang="less" scoped>
  .zoey-input{
    width: 100%;
    position: relative;
    font-size: 14px;
    display: inline-block;
    .zoey-input_inner{
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,045,.355,1);
      width: 100%;

      &:focus{
        outline: none;
        border-color: #409eff;
      }
      // input禁用样式
      &.is-disabled{
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor:not-allowed;
      }
    }
  }
  // 后面加suffix的意思是后面如果有后缀的话，触发该样式
  .zoey-input_suffix{
    .zoey-input_inner{
      padding-right: 30px;
    }
    .zoey-input_suffix{
      position: absolute;
      right: 10px;
      height: 100%;
      top: 0;
      line-height: 40px;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;
      z-index: 900;
      i{
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
</style>
