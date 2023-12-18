/*
 * @Author: zoey
 * @Date: 2023-11-22 21:39:46
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-27 21:00:35
 * @Description: 请填写简介
 */
import createInstance from './instance.js'
/**
 * 读取配置并渲染 Message
 * @param {Object} typeCfg 类型配置
 * @param {Object/String} cfg 自定义配置
 */
function renderMsg(typeCfg = {}, cfg = '') {
  const isContent = typeof cfg === 'string'
  cfg = isContent ? {
    content: cfg
  } : cfg
  const config = Object.assign({}, typeCfg, cfg)//合并配置
  const {
    type = 'text',
    content = '',
    icon = '',
    duration = 3000,//自动关闭延迟时间
    close = false
  } = config
  return createInstance({
    type,
    content,
    icon,
    duration,
    close
  })
}
export default {
  //纯文本消息
  text(cfg = '') {
    const textCfg = {
      type: 'text',
      icon: ''
    }
    return renderMsg(textCfg, cfg)
  },
  //成功提示
  success(cfg = '') {
    const successCfg = {
      type: 'success',
    }
    return renderMsg(successCfg, cfg)
  },
  //错误提示
  error(cfg = "") {
    const errorCfg = {
      type: "error",
      icon: 'ri-close-circle-fill'
    }

    return renderMsg(errorCfg, cfg);
  },
}
