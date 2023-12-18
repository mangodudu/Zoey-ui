/*
 * @Author: zoey
 * @Date: 2023-12-11 13:04:22
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-11 21:31:59
 * @Description: 请填写简介
 */
import { createApp } from 'vue'
import MyLoading from './loading.vue'
const ZoeyLoading = {
  mounted(el, binding) {
    const app = createApp(MyLoading)

    //动态创建一个div节点，将app挂载在div上
    //loading组件替换此div标签的innerHTML
    const instance = app.mount(document.createElement('div'))

    //updated也需要用到instance，所以将instance添加到el上
    //在updated中，可以通过el.instance访问
    el.instance = instance

    //判断是否为全屏遮罩
    if (binding.arg) {
      if (binding.arg.fullscreen) {
        handleFullscreen(binding.value, el)
      } else {
        if (binding.value) {
          append(el, el.instance)
        }
      }
      //判读单所传值中是否有backgroundColor值
      if (binding.arg.backgroundColor != undefined) {
        el.instance.setBackgroundColor(binding.arg.backgroundColor)
      }
      //判断是所传值中是否有title值
      if (binding.arg.title != undefined) {
        el.instance.setTitle(binding.arg.title)
      }
      //判断是所传值中是否有icon值
      if (binding.arg.icon != undefined) {
        el.instance.setIcon(binding.arg.icon)
      }
    }

  },
  updated(el, binding) {
    if (binding.value != undefined) {
      if (binding.value) {
        //判断是否为全屏遮罩
        if (binding.arg) {
          if (binding.arg.fullscreen) {
            handleFullscreen(binding.value, el)
          } else {
            append(el, el.instance)
          }
          //判断是所传值中是否有title值
          if (binding.arg.title != undefined) {
            el.instance.setTitle(binding.arg.title)
          }
          //判断是所传值中是否有icon值
          if (binding.arg.icon != undefined) {
            el.instance.setIcon(binding.arg.icon)
          }
        }
      } else {
        if (binding.arg.fullscreen) {
          handleFullscreen(binding.value, el)
        } else {
          remove(el, el.instance)
        }
      }
    }
  }
}

const relative = 'zoey-relative'//g-relative全局相对定位样式名称
const hidden = 'zoey-hidden'//g-hidden全局进制/隐藏滚动样式名称

//插入节点
function append(el, instance) {
  const style = getComputedStyle(el)
  el.classList.add(hidden)//添加类名
  if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
    el.classList.add(relative)
  }
  el.appendChild(instance.$el)
}
//移除节点
function remove(el, instance) {
  if (!el.contains(instance.$el)) {
    return
  }
  //移除动态创建的div节点
  el.removeChild(instance.$el)

  el.classList.remove(relative)//移除类名
  el.classList.remove(hidden)//移除类名
}
//处理全局loading
function handleFullscreen(isFullscreen, el) {
  const htmEle = document.documentElement
  if (isFullscreen) {
    append(htmEle, el.instance)
  } else {
    remove(htmEle, el.instance)
  }
}

export default ZoeyLoading

