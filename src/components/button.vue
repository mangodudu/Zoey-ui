<!--
 * @Author: zoey
 * @Date: 2023-08-28 15:52:03
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-16 15:25:11
 * @Description: 请填写简介
-->
<template>
  <button class="zoey-button" type="button" :disabled="isDisabled"
    :class="[`zoey-button--${type}`,`zoey-button--${size}`,{'is-plain':plain},{'is-round':round},{'is-circle':circle},{'is-disabled':isDisabled}]">
    <div class="loading">
      <i v-if="loading" class="zoey-icon-loading"></i>
    </div>
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'ZoeyButton',
    props: {
      type: {
        type: String,
        default: ''
      },
      plain: {
        type: Boolean,
        default: false
      },
      round: {
        type: Boolean,
        default: false
      },
      circle: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: '',
        validator: (value) => {
          return ['small', 'medium', 'mini', ''].includes(value)
        }
      },
      loading: {
        type: [Boolean, String],
        default: false,
      }
    },
    computed: {
      isDisabled() {
        return this.loading || this.disabled
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .loading {
    display: inline-block;
    animation: circle 1s linear infinite;
  }


  @keyframes circle {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .zoey-button {
    margin: 0;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    /*    margin: 0; */
    transition: 0.1s;
    font-weight: 500;
    /* 禁止元素的文字被选中 */
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    border-radius: 4px;

    &:hover,
    &:focus {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }

  /* size属性 */
  .zoey-button-- {
    margin: 0;
    padding: 12px 20px;
    font-size: 14px;
  }

  .zoey-button--medium {
    padding: 10px 20px;
  }

  .zoey-button--small {
    font-size: 12px;
    padding: 9px 15px;
  }

  .zoey-button--mini {
    font-size: 12px;
    padding: 7px 15px;
  }


  /* type属性 */

  .zoey-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover,
    &:focus {
      background: #66b1ff;
      background-color: #66b1ff;
      color: #fff;
    }
  }

  .zoey-button--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;

    &:hover,
    &:focus {
      background: #85ce61;
      background-color: #85ce61;
      color: #fff;
    }
  }

  .zoey-button--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;

    &:hover,
    &:focus {
      background: #a6a9ad;
      background-color: #a6a9ad;
      color: #fff;
    }
  }

  .zoey-button--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;

    &:hover,
    &:focus {
      background: #ebb563;
      background-color: #ebb563;
      color: #fff;
    }
  }

  .zoey-button--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;

    &:hover,
    &:focus {
      background: #f78989;
      background-color: #f78989;
      color: #fff;
    }
  }

  /* plain属性 */
  .zoey-button.is-plain {

    &:hover,
    &:focus {
      background: #fff;
      border-color: #489eff;
      color: #409eff;
    }
  }

  .zoey-button--primary.is-plain {
    color: #409eff;
    background: #ecf5ff;

    &:hover,
    &:focus {
      background: #409eff;
      border-color: #409eff;
      color: #fff;
    }
  }

  .zoey-button--success.is-plain {
    color: #67c23a;
    background: #c2e7b0;

    &:hover,
    &:focus {
      background: #67c23a;
      border-color: #67c23a;
      color: #fff;
    }
  }

  .zoey-button--info.is-plain {
    color: #909399;
    background: #d3d4d6;

    &:hover,
    &:focus {
      background: #909399;
      border-color: #909399;
      color: #fff;
    }
  }

  .zoey-button--warning.is-plain {
    color: #e6a23c;
    background: #f5dab1;

    &:hover,
    &:focus {
      background: #e6a23c;
      border-color: #e6a23c;
      color: #fff;
    }
  }

  .zoey-button--danger.is-plain {
    color: #f56c6c;
    background: #fbc4c4;

    &:hover,
    &:focus {
      background: #f56c6c;
      border-color: #f56c6c;
      color: #fff;
    }
  }

  /* round属性 */
  .zoey-button.is-round {
    border-radius: 20px;
    padding: 12px 23px;
  }

  /* circle属性 */
  .zoey-button.is-circle {
    border-radius: 50%;
    padding: 12px;
  }

  /* 按钮后文本样式 */
  .zoey-button [class*=zoey-icon-]+span {
    /*     margin-left: 5px; */
  }

  /* disabled属性 */
  .zoey-button.is-disabled {
    cursor: no-drop;
    opacity: 0.6;
  }
</style>