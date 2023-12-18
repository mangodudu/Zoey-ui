/*
 * @Author: zoey
 * @Date: 2023-08-28 15:45:37
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-02 21:31:25
 * @Description: 请填写简介
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8081
  },
  publicPath: './',
  outputDir: 'html',
  assetsDir: 'static'
})
