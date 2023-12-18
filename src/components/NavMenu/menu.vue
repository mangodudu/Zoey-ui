<!--
 * @Author: zoey
 * @Date: 2023-12-12 18:29:52
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-17 22:54:19
 * @Description: 请填写简介
-->
<template>
  <div class="menu-contianer">
    <slot></slot>
  </div>
</template>
<script>
  import { h } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  export default {
    name: 'ZoeyMenu',
    props: {
      defaultActive: {
        type: String,
      },
      mode: {
        type: String,
        default: 'vertical',
        validator: (value) => {
          return ['vertical', 'horizontal'].includes(value)
        }
      },
      router: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter()
      const route = useRoute()
      const finalMenu = []
      let defaultActiveItems
      const modeStyle = {
        vertical: {
          display: 'flex',
          flexDirection: 'column'
        },
        horizontal: {
          display: 'table',
          borderBottom: ' 1px solid #F2F2F2',
        }
      }
      function itemClick(e) {
        const targetParentDom = e.target.__vueParentComponent
        //const targetDom=e.target
        const index = targetParentDom.props.index
        if (props.router) {
          //_this.$router.push({path:`${index}`})
          router.push({
            path: `${index}`,
            query: {
              ...route.query
            }
          })
        }
        if (defaultActiveItems.__v_isVNode) {
          defaultActiveItems.el.className = defaultActiveItems.el.className.replace('menu-children-isactive', '')
        }
        defaultActiveItems = e.target
      }
      return () => {
        const slotItems = slots.default()
        const isVertical = props.mode == 'vertical' ? true : false
        slotItems.forEach((item) => {
          const isActive = item.props.index == props.defaultActive ? true : false
          if (props.mode == 'horizontal') {
            item.props.isHorizontal = true
          }
          const MenuChildren = h('li', {
            class: { 'menu-children-vertical': isVertical, 'menu-children-horizontal': !isVertical, 'menu-children-isactive': isActive },
            tabindex: '-1'
          }, item);
          if (isActive) defaultActiveItems = MenuChildren
          finalMenu.push(MenuChildren)
        })
        const finalDom = h('ul', {
          class: 'menu-contianer',
          onClick: e => itemClick(e),
          style: modeStyle[props.mode]
        }, finalMenu)
        return finalDom

      }
    }
  }
</script>
<style lang="less" scoped>
  .menu-contianer {
    width: 100%;
    color: #666;

    .menu-children- {
      &vertical {
        display: block;
        padding: 0 20px;
      }

      &horizontal {
        float: left;
        display: list-item;
        list-style: none;
        position: relative;
        padding: 0 20px;

        &:hover,
        &:focus {
          background-color: #fff;
          border-bottom: 2px solid #409eff
        }
      }

      &isactive {
        color: #409eff;

        &:focus {
          background-color: #fff;
          border-bottom: 2px solid #409eff
        }
      }
    }

  }
</style>