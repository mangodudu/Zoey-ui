<!--
 * @Author: zoey
 * @Date: 2023-12-12 18:30:22
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-18 10:34:18
 * @Description: 请填写简介
-->
<template>
  <div :class="[{'sub-menu-vertical':!isHorizontal},{'sub-menu-horizontal':isHorizontal}]">
    <div ref="title" :class="['sub-menu-title',{'is-horizontal':isHorizontal},{'is-item':isItem}]" @click="showMenu"
      tabindex="1" @mouseover="mouseOver">
      <div class="sub-menu-title-slot">
        <slot name="title"></slot>
      </div>
      <div class="sub-menu-option" v-if="!isItem">
        <i v-if="showContent" class="zoey-icon-arrow-up-bold"></i>
        <i v-if="!showContent" class="zoey-icon-arrow-down-bold"></i>
      </div>
      <div class="sub-menu-option" v-if="isItem">
        <i v-if="showContent" class="zoey-icon-arrow-right-bold"></i>
        <i v-if="!showContent" class="zoey-icon-arrow-left-bold"></i>
      </div>
    </div>
    <div class="sub-menu-content-vertical" v-if="!isHorizontal">
      <div class="sub-menu-content" v-show="showContent">
        <slot></slot>
      </div>
    </div>
  </div>
  <div :class="['sub-menu-content-horizontal',{'is-item':isItem}]" ref="horizontalContent"
    :style="horizontalContentStyles" v-if="isHorizontal">
    <div v-show="showContent" class="sub-menu-content">
      <!--       <slot></slot> -->
      <component :is="horContNode"></component>
    </div>
  </div>
</template>
<script>
  import { h, ref, reactive, onUpdated } from 'vue'
  export default {
    name: 'ZoeySubmenu',
    props: {
      index: {
        type: String,
        default: null,
        require: true
      },
      isHorizontal: {
        type: Boolean,
        default: false
      },
      isItem: {
        type: Boolean,
        default: false
      },
      number: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        showContent: false
      }
    },
    computed: {
      horizontalContentStyles() {
        let res = {
          position: 'absolute',
          zIndex: 100,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, .1)',
        }
        if (this.isItem) {
          res.width = this.titleDOMRect.width - 30 + 'px'
          res.left = this.titleDOMRect.width + 30 + 'px'
          res.top = this.number * this.titleDOMRect.height + 'px'
          //res.left = '0px'
        }
        return res
      }
    },
    setup(props, { slots }) {
      let horContNode
      let title = ref(null)
      let titleDOMRect = reactive({})
      let titleNode
      if (props.isHorizontal) {
        let horContList = []
        slots.default().forEach((slot, i) => {
          //console.log("slot:", slot)
          if (props.isHorizontal) {
            slot.props.isHorizontal = true
          }
          if (slot.type.name == 'ZoeySubmenu') {
            slot.props.number = i
            slot.props.isItem = true
            console.log("slot", slot)
          }
          horContList.push(slot)
        })
        horContNode = h('div', {
          class: 'sub-menu-content-inner',
          style: {
            width: '200px',
            display: 'table',
            margin: '10px',
          }
        }, horContList)
      }
      onUpdated(() => {
        titleNode = title.value.getBoundingClientRect()
        for (let key in titleNode) {
          if (typeof titleNode[key] !== 'function') {
            titleDOMRect[key] = titleNode[key]
          }
        }
        // console.log("title.value:", title.value)
        // console.log("titleDOMRect:", titleDOMRect)
      })
      return {
        horContNode,
        title,
        titleDOMRect
      }
    },
    methods: {
      showMenu() {
        this.showContent = !this.showContent
      },
      mouseOver() {
        if (this.isHorizontal && !this.showContent) {
          setTimeout(() => {
            this.showContent = true
          }, 2000)
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  .sub-menu-vertical {
    display: flex;
    flex-direction: column;

    .sub-menu-title {
      display: table;
      position: relative;
      height: 56px;
      line-height: 56px;
      font-weight: 56px;
      text-align: left;


      &:hover,
      &:focus {
        background-color: #ECF5FF;
      }

      &:focus {
        color: #409eff;
      }

      &.is-horizontal {

        &:hover,
        &:focus {
          background-color: #fff;
          border-bottom: 1px solid #409eff
        }
      }

      :first-child {
        margin-right: 10px;
      }

      .sub-menu-title-slot {
        display: table-cell;

      }

      .sub-menu-option {
        display: table-cell;
        padding-left: 10px;
        width: 12px;

        i {
          font-size: 12px;
          width: 12px;
        }
      }
    }

    .sub-menu-content {
      display: block;
      padding-left: 20px;
    }

  }

  .sub-menu-horizontal {
    .sub-menu-title {
      display: table;
      height: 56px;
      line-height: 56px;
      font-weight: 56px;
      text-align: left;

      &:focus {
        color: #409eff;
        background-color: #fff;
      }

      &.is-horizontal {
        &.is-item {
          width: 100%;
        }
      }

      :first-child {
        margin-right: 10px;
      }

      .sub-menu-title-slot {
        display: table-cell;

      }

      .sub-menu-option {
        display: table-cell;
        padding-left: 10px;
        width: 12px;

        i {
          font-size: 12px;
        }
      }
    }

  }

  .sub-menu-content-horizontal {
    margin-top: 10px;
    position: relative;
  }
</style>