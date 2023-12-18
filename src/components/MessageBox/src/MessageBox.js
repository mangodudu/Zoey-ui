/*
 * @Author: zoey
 * @Date: 2023-11-23 20:21:16
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-23 21:39:49
 * @Description: 请填写简介
 */
import createInstance from "./Instance.js";
/**
 * 读取配置并渲染 MessageBox
 * @param {Object} typeCfg 类型配置
 * @param {Object/String} cfg 自定义配置
 */
function renderMsgBox(message, title, cfg) {
  const config = Object.assign({}, cfg)//合并配置
  const {
    type = 'text',
    icon = '',
    duration = 3000,
    close = false,
    showCancelButton = false,
    showConfirmButton = false,
    cancelButtonText = '',
    confirmButtonText = ''
  } = config
  return createInstance(message, title, {
    type,
    icon,
    duration,
    close,
    showCancelButton,
    showConfirmButton,
    cancelButtonText,
    confirmButtonText
  })
}
export default renderMsgBox
