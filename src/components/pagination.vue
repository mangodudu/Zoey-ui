<!--
 * @Author: zoey
 * @Date: 2023-11-21 22:05:18
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-22 13:27:01
 * @Description: 请填写简介
-->
<template>
    <div class="page-warrper">
      <!-- 总页数 -->
      <span class="my-page-total" v-if="showTotal">共{{ total }}条</span>
      <ul class="page-list">
        <!-- 上一页 -->
        <li :class="['page-list-item',currentPage<=1?'disabled':'']" @click="handleBeforeOrAfterClick('before')">&lt;</li>
      <!-- 中间页码数 -->
      <template v-for="(pageItem,index) in pageList">
        <!-- 向前5页 -->
        <li :class="['page-list-item','page-list-item-prev']" :key="index+'prev'" title="向前5页" v-if="pageItem=='prev'" @click="handlePageItemClick(pageItem,'prev')" @mouseover="prevStatus=false" @mouseleave="prevStatus=true">
          <i v-if="prevStatus">...</i>
        </li>
        <!-- 正常页码 -->
        <li 
        :class="['page-list-item','page-list-next']"
        @click="handlePageItemClick(pageItem,'next')"
        :key="index+'next'"
        title="向后5页"
        v-else-if="pageItem=='next'"
        @mouseenter="nextStatus = false"
        @mouseleave="nextStatus = true">
          <i v-if="nextStatus"> ...</i>
          <i v-else>>></i>
        </li>
        <!-- 向后5页 -->
        <li
          :class="['page-list-item', currentPage == pageItem ? 'active' : '']"
          @click="handlePageItemClick(pageItem)"
          :key="index+'page'"
          :title="pageItem"
          v-else
        >
          {{ pageItem }}
        </li>
      </template>
      <!-- 下一页 -->
      <li
        :class="[
          'page-list-item',
          currentPage >= totalPage && totalPage > 0 ? 'disbled' : '',
        ]"
        @click="handleBeforeOrAfterClick('after')"
      >
        &gt;
      </li>
      </ul>
      <!-- 每页条数电梯 -->
      <div class="page-size-select" v-if="showSize">
      <select @change="handlePageSizeChange">
      <option :value="pageSizeItem" v-for="pageSizeItem in pageSizes" :key="pageSizeItem">{{ pageSizeItem }}条/页</option>
    </select></div>
    </div>
</template>
<script>
export default {
  name:'ZoeyPagination',
  props:{
    background:{
      type:Boolean,
      default:false
    },
    current:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:10
    },
    pageSizes:{
      type:Array,
      default(){
        return [10,20,30,40]
      }
    },
    total:{
      type:Number,
      require:true
    },
    layout:{
      type:String,
      validator(value){
        const rulers=['total','sizes','prev','pager','next','jumber']
        let arrValue=value.split(',')
        arrValue.forEach(item=>{
          if(!rulers.includes(item)) return false
        })
        return true
      }
    }
  },
   data() {
      return {
        currentPage:this.current||1,
        currentPageSize:this.pageSize,
        prevStatus:true,
        nextStatus:true
      }
   },
   created(){
   },
   computed:{
    showTotal(){
      return this.layout.includes('total')
    },
    showSize(){
      return this.layout.includes('sizes')
    },
    totalPage(){
      return Math.ceil(this.total/this.currentPageSize)
    },
    pageList(){
      if(this.totalPage<=5) return this.totalPage
      if(this.currentPage<=3){
        return [1,2,3,'next',this.totalPage]
      }
      if(this.currentPage>3&&this.totalPage-this.currentPage<=2){
        return [1,'prev',this.totalPage-2,this.totalPage-1,this.totalPage]
      }
      return[1,'prev',this.currentPage-2,this.currentPage-1,this.currentPage,this.currentPage+1,this.currentPage+2,'next',this.totalPage]
    }
   },
   methods:{
    //页面点击
    handlePageItemClick(item,type){
      this.prevStatus=true;
      this.nextStatus=true;
      switch(type){
        case 'prev':
          this.currentPage-=5;
          if(this.currentPage<1){
            this.currentPage=1
          }
          break;
        case 'next':
          this.currentPage+=5
          if(this.currentPage>this.totalPage){
            this.currentPage=this.totalPage
          }
          break;
        default:
          if(this.currentPage==item) return
          this.currentPage=item
      }
      //发布页码变更事件
      this.$emit('current-change',this.currentPage)
    },
    //下一页和下一页点击
    handleBeforeOrAfterClick(type){
      switch(type){
        case 'before':
          this.currentPage--;
          if(this.currentPage<1) this.currentPage=1;
          break;
        case 'after':
          this.currentPage++;
          if(this.currentPage>this.totalPage){
            this.currentPage=this.totalPage
          }
          break;
      }
      //发布页码变更事件
      this.$emit('current-change',this.currentPage)
    },
    //每页条数大小变化
    handlePageSizeChange(e){
      this.currentPageSize=Number(e.target.value)
      this.$emit('size-change',this.currentPageSize);
      this.currentPage=1;
    },
   },
}
</script>
<style lang="less" scoped>
.page-warrper {
  display: flex;
  align-items: center;
  .page-list {
    .page-list-item {
      display: inline-block;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      transition: all 0.2s ease-in-out;
      margin-right: 6px;
      margin-left: 6px;
      &:hover {
        border-color: #2d8cf0;
        color: #2d8cf0;
      }
    }
    .active.page-list-item {
      border-color: #2d8cf0;
      color: #fff;
      background-color: #2d8cf0;
    }
    .disbled.page-list-item {
      cursor: not-allowed;
      background-color: #fff;
      color: #dcdee2;
    }
    .disbled:hover {
      border-color: #dcdee2;
    }
  }
}
</style>
