<!--
 * @Author: zoey
 * @Date: 2023-11-22 20:29:23
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-06 20:55:24
 * @Description: 请填写简介
-->
<template>
  <transition name="fade">
    <div class="message-box_wrapper" v-if="visible">
      <div class="message-box">
        <!-- title部分 -->
        <div class="header">
          <span class="title">{{title}}</span>
          <i class="zoey-icon-close" @click="handleAction('cancle')"></i>
        </div>
        <!-- content部分 -->
        <div class="body">
          <i class="body-status" :class="config.icon" v-if="showbodyicon"></i>
          <div class="content">{{message}}</div>
        </div>
        <!-- 操作部分 -->
        <div class="btn_group" ref="option">
          <zoey-button v-if="showCancelButton" @click="handleAction('cancle')">{{config.cancelButtonText}}</zoey-button>
          <zoey-button type="primary" v-if="showConfirmButton" @click="handleAction('confirm')">
            {{config.confirmButtonText}}</zoey-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import ZoeyButton from '@/components/button.vue'
  export default {
    name: 'ZoeyMessageBox',
    props: {
      config: { type: Object, default: () => { } },
      remove: { type: Function, default: () => { } },
      confirmCallback: { type: Function, default: () => { } },
      cancelCallback: { type: Function, default: () => { } },
    },
    components: {
      ZoeyButton
    },
    data() {
      return {
        visible: true,
      }
    },
    computed: {
      title() {
        return this.config.title
      },
      message() {
        return this.config.message
      },
      showbodyicon() {
        if (this.config.icon) return true
        return false
      },
      showCancelButton() {
        if (this.config.cancelButtonText) return true
        return this.config.showCancelButton
      },
      showConfirmButton() {
        if (this.config.confirmButtonText) return true
        return this.config.showConfirmButton
      }
    },
    methods: {
      handleAction(type) {
        switch (type) {
          case 'cancle':
            //this.result.value = 'cancle'
            this.cancelCallback()
            break;
          case 'confirm':
            //this.result.value = 'confirm'
            this.confirmCallback()
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  .message-box_wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: 2001;
    user-select: none;

    .message-box {
      color: #555;
      width: 400px;
      position: absolute;
      left: 50%;
      top: 50%;
      box-sizing: border-box;
      box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
      transform: translate3d(-50%, -50%, 0);
      border-radius: 5px;
      background-color: #fff;
      padding-bottom: 10px;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 15px 10px;
      }

      .title {
        font-size: 18px;
      }

      .body {
        padding: 10px 15px;
        font-size: 14px;
        display: flex;
        align-items: center;

        .box_status {
          font-size: 24px;
          margin-right: 12px;
        }
      }

      .btn_group {
        padding: 5px 15px 0;
        text-align: right;
      }

    }
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
</style>