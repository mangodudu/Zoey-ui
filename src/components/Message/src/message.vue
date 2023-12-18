<!--
 * @Author: zoey
 * @Date: 2023-11-22 21:15:30
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-27 20:54:53
 * @Description: 请填写简介
-->
<template>
  <!-- 消息列表 -->
  <transition name="slide-fade">
    <div class="message-container" :class="[`message-container--${config.type}`]" v-show="visibled">
      <!-- 内容 -->
      <div class="message-content">

        <!-- 消息类型图标，通过消息类型确定，text类型不配置图标 -->
        <div class="message-icon" v-if="config.icon">
          <i :class="config.icon"></i>
        </div>

        <!-- 消息文本 -->
        <span v-text="config.content"></span>

        <!-- 手动关闭消息 -->
        <div class="option" v-if="!config.close">
          <i class="zoey-icons-close" @click="onClose"></i>
        </div>

      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'ZoeyMessage',
    props: {
      config: { type: Object, default: () => { } },
      remove: { type: Function, default: () => { } }
    },
    data() {
      return {
        visibled: false
      }
    },
    created() {
      this.onOpen(this.config)
    },
    computed: {
    },
    methods: {
      onOpen(config) {
        setTimeout(() => {
          this.visibled = true
        }, 10)
        if (config.duration != 0) {
          setTimeout(() => {
            this.onClose()
          }, config.duration)
        }
      },
      onClose() {
        this.visibled = false;
        setTimeout(() => {
          this.remove()
        }, 200)
      }
    },
  }
</script>
<style lang="less" scoped>
  @radius: 4px;
  @normalHeight: 34px;

  .message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    z-index: 9999;
    transform: translateZ(9999px);
    padding-top: 28px;
    transition: top .4s ease;


    .message-container {
      margin-bottom: 14px;

      .message-icon {
        display: inline-block;

        i {
          font-size: 18px;
          font-weight: 400;
          margin-top: -3px;
          margin-right: 6px;
          display: inline-block;
          box-sizing: border-box;
          vertical-align: middle;
        }
      }

      .message-content {
        width: 380px;
        display: inline-block;
        padding: 4px 18px;
        height: @normalHeight;
        text-align: left;
        line-height: @normalHeight;
        font-size: 14px;
        font-weight: 400;
        border-radius: @radius;
        color: #595959;
        box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
        background: #ffffff;

        .option {
          display: inline-block;
          pointer-events: all;
          margin-left: 18px;

          i {
            font-size: 18px;
            font-weight: 400;
            margin-top: -3px;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
            cursor: pointer;
            color: #d9d9d9;
            transition: color 0.2s ease;

            &:hover {
              color: #ff7c75;
              transition: color 0.2s ease;
            }
          }
        }
      }
    }

    .message-container--error {
      .message-content {
        color: #ff7c75;
        backgournd-color: #fef0f0;
      }

    }

    .message-container--info {
      .message-content {
        color: #909399;
        backgournd-color: #EDF2FC;
      }

    }

    .message-container--success {
      .message-content {
        color: #67c23a;
        background-color: #F0F9EB
      }
    }

    .slide-fade-enter-active {
      transition: all .2s ease-out;
    }

    .slide-fade-leave-active {
      transition: all .2s ease;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
</style>