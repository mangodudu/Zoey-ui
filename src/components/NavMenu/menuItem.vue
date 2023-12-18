<!--
 * @Author: zoey
 * @Date: 2023-12-12 18:30:02
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-18 10:26:52
 * @Description: 请填写简介
-->
<template>
  <div :class="['menu-item-contianer',{'is-disabled':disabled},{'is-active':isActive},{'is-horizontal':isHorizontal}]"
    tabindex="1">
    <slot></slot>
    <div class="menu-item-title">
      <slot name="title"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      index: {
        type: String,
        default: null,
        require: true
      },
      route: {
        type: Object
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: false
      },
      isHorizontal: {
        type: Boolean,
        default: false
      }
    },
    name: 'ZoeyMenuItem',
    data() {
      return {
      }
    },
  }
</script>
<style lang="less" scoped>
  .menu-item-contianer {
    height: 56px;
    line-height: 56px;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: #ECF5FF;
    }

    &:focus {
      color: #409eff;
    }

    &.is-disabled {
      cursor: default;
      pointer-events: none;
      opacity: 0.6;
    }

    &.is-horizontal {
      width: 100%;

      &:hover,
      &:focus {
        background-color: #fff;
      }
    }

    .menu-item-title {

      :first-child {
        margin-right: 10px;
      }
    }

    .menu-item-content {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>