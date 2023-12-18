/*
 * @Author: zoey
 * @Date: 2023-11-23 20:21:06
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-06 20:02:36
 * @Description: 请填写简介
 */
import { h, render } from 'vue'
import ZoeyMessageBox from './messageBox.vue'

/**
 * MessageBox 实例操作
 * @param {Object} cfg 实例配置
 */
const createInstance = function (message, title, cfg) {
  const config = cfg || {}
  config.message = message
  config.title = title
  //1、创建包裹容器，并设置外层class属性，消息计数
  let messageBoxNode = document.createElement('div')
  let attr = document.createAttribute('class')
  attr.value = 'message-box'
  messageBoxNode.setAttributeNode(attr)
  //2、创建实例并挂载到body
  document.body.appendChild(messageBoxNode)

  return new Promise(function (resolve, reject) {
    const confirmCallback = () => {
      document.body.removeChild(messageBoxNode)
      // 手动移除render生成的dom
      resolve('confirm')
    }

    const cancelCallback = () => {
      document.body.removeChild(messageBoxNode)
      // 手动移除render生成的dom
      reject('cancel')
    }
    const vNode = h(ZoeyMessageBox, {
      config,
      confirmCallback,
      cancelCallback
    })
    render(vNode, messageBoxNode)
  })
}
export default createInstance