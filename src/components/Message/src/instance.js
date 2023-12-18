/*
 * @Author: zoey
 * @Date: 2023-11-22 21:15:36
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-22 22:17:46
 * @Description: 请填写简介
 */
import { createApp } from 'vue';
import ZoeyMessage from './message.vue'

/**
 * Message 实例操作
 * @param {Object} cfg 实例配置
 */
const createInstance = cfg => {
  const config = cfg || {}
  //1、创建包裹容器，并设置外层class属性、消息计数
  let messageNode = document.createElement('div')
  let attr = document.createAttribute('class')
  attr.value = 'message'
  messageNode.setAttributeNode(attr)
  const height = 54//单个消息框高度
  const messageList = document.getElementsByClassName('message')
  messageNode.style.top = `${messageList.length * height}px`
  //3、实现取消挂载方法，和取消挂载后重新计数
  const handleRemove = () => {
    app.unmount(messageNode)
    document.body.removeChild(messageNode)
    resetMsgTop()
  }
  const resetMsgTop = () => {
    for (let i = 0, len = messageList.length; i < len; i++) {
      messageList[i].style.top = `${i * height}px`
    }
  }
  //2、创建实例并挂载到body
  const app = createApp(ZoeyMessage, {
    config,
    remove() {
      handleRemove()//移除元素，消息关闭后从DOM上取消挂载并移除
    }
  })
  //挂载实例并追加到body结尾
  app.vm = app.mount(messageNode)
  document.body.appendChild(messageNode)
  app.close = () => {
    handleRemove()
  }
  return app
}

export default createInstance