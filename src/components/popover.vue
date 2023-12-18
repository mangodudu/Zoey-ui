<!--
 * @Author: zoey
 * @Date: 2023-12-14 21:11:52
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-16 23:33:28
 * @Description: 请填写简介
-->
<template>
  <!--   <div class="popover-container" ">

  </div> -->
  <div class="popover-reference" ref="reference" @click.stop="event=>handleTrigger(event,'click')"
    @mouseover="event=>handleTrigger(event,'mouseover')" @mouseleave="event=>handleTrigger(event,'mouseleave')"
    @mouseup="event=>handleTrigger(event,'mouseup')" @mousedown="event=>handleTrigger(event,'mousedown')">
    <slot name="reference">
    </slot>
  </div>
  <div class="popver-arrow" :style="arrowStyles" v-show="showPlain"></div>
  <div class="popver-plain" ref="plain" :style="[{width:width+'px'},positionStyles]" v-show="showPlain">
    <div class="popver-title">{{title}}</div>
    {{content}}
    <slot></slot>
  </div>
</template>
<script>
  import { ref, onMounted, reactive } from 'vue'
  export default {
    name: 'ZoeyPopover',
    props: {
      modelValue: {
        type: String
      },
      placement: {
        type: String,
        default: 'bottom',
        validator: (value) => {
          return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].includes(value)
        }
      },
      title: {
        type: String,
        default: '标题'
      },
      width: {
        type: [String, Number],
        default: '150'
      },
      trigger: {
        type: String,
        default: 'click',
        validator: (value) => {
          return ['click', 'focus', 'hover', 'manual'].includes(value)
        }
      },
      content: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      visibleArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        //showPlain: false,
      }
    },
    computed: {
      positionStyles() {
        const width = Number(this.width) + 40
        const arrowWidth = 12
        let res = {}
        switch (this.placement) {
          case 'bottom':
            res = {
              left: this.refDOMRect.right - this.refDOMRect.width / 2 - width / 2 + 'px',
              top: this.refDOMRect.bottom + arrowWidth + 'px'
            }
            break;
          case 'top':
            res = {
              left: this.refDOMRect.right - this.refDOMRect.width / 2 - width / 2 + 'px',
              bottom: document.body.clientHeight - (this.refDOMRect.top - arrowWidth) + 'px'
            }
            break;
          case 'left':
            res = {
              transformOrigin: 'right',
              left: this.refDOMRect.left - arrowWidth - width + 'px',
              top: this.refDOMRect.bottom - this.refDOMRect.height / 2 + 'px',
              transform: 'translate(0,-50%)',
            }
            break;
          case 'right':
            res = {
              transformOrigin: 'left',
              transform: 'translate(0,-50%)',
              left: this.refDOMRect.right + arrowWidth + 'px',
              top: this.refDOMRect.bottom - this.refDOMRect.height / 2 + 'px',
            }
            break;
          default:
            break;
        }
        return res
      },
      arrowStyles() {
        let res = {}
        const color = '#fff'
        const width = 12
        switch (this.placement) {
          case 'bottom':
            res = {
              borderBottomColor: color,
              left: this.refDOMRect.right - this.refDOMRect.width / 2 - width / 2 + 'px',
              top: this.refDOMRect.bottom + 'px',
              filter: 'drop-shadow(2px -2px 2px rgba(0, 0, 0, .1))'
            }
            break;
          case 'top':
            res = {
              borderTopColor: color,
              left: this.refDOMRect.right - this.refDOMRect.width / 2 - width / 2 + 'px',
              top: this.refDOMRect.top - width + 'px',
              filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, .1))'
            }
            break;
          case 'left':
            res = {
              borderLeftColor: color,
              left: this.refDOMRect.left - width + 'px',
              top: this.refDOMRect.bottom - this.refDOMRect.height / 2 - width / 2 + 'px',
              filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, .1))'
            }
            break;
          case 'right':
            res = {
              borderRightColor: color,
              left: this.refDOMRect.right + 'px',
              top: this.refDOMRect.bottom - this.refDOMRect.height / 2 - width / 2 + 'px',
              filter: 'drop-shadow(-2px 2px 2px rgba(0, 0, 0, .1))'
            }
            break;
          default:
            res = { borderBottomColor: color }
            break;
        }
        //res.boxShadow = '0px 2px 12px 0px rgba(0, 0, 0, .1)'
        return res
      },
    },
    setup(props) {
      let reference = ref(null)
      let refDOMRect = reactive({})
      let showPlain = false
      function handleTrigger(event, type) {
        const trigger = props.trigger
        switch (type) {
          case 'click': {
            if (trigger == 'click') {
              showPlain.value = !showPlain.value
            }
            else if (trigger == 'manual') {
              showPlain.value = props.modelValue
            }
            break;
          }
          case 'mouseover': {
            if (trigger == 'hover') {
              showPlain.value = true
            }
            break
          }
          case 'mouseleave': {
            if (trigger == 'hover') {
              showPlain.value = false
            }
            break
          }
          case 'mouseup': {
            if (trigger == 'focus') {
              showPlain.value = false
            }
            break
          }
          case 'mousedown': {
            if (trigger == 'focus') {
              showPlain.value = true
            }
            break
          }
        }
      }
      onMounted(() => {
        const DOMRect = reference.value.getBoundingClientRect()
        for (let key in DOMRect) {
          if (typeof DOMRect[key] !== 'function') {
            refDOMRect[key] = DOMRect[key]
          }
        }
        document.addEventListener('click', () => {
          if (props.trigger != 'manual') {
            showPlain.value = false
          }
        })
        document.click = null
      })
      return {
        reference,
        refDOMRect,
        showPlain,
        handleTrigger
      }
    },
    methods: {

    },
  }
</script>
<style lang="less" scoped>
  .popover-reference {
    display: inline-block;
    margin: 0;
  }

  .popver-arrow {
    width: 0;
    height: 0;
    position: absolute;
    z-index: 100;
    display: block;
    border: 6.5px solid transparent;
  }



  .popver-plain {
    position: absolute;
    z-index: 99;
    border-radius: 4px;
    border: 1px solid #ebeef7;
    overflow: hidden;
    background-color: #fff;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, .1);
    padding: 18px 20px;

    .popver-title {
      font-style: normal;
      font-size: 16px;
      margin-bottom: 12px;
    }
  }
</style>