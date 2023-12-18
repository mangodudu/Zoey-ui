/*
 * @Author: zoey
 * @Date: 2023-12-02 19:35:01
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-02 21:40:43
 * @Description: 请填写简介
 */
import axios from 'axios'

const instance = axios.create({
  //baseURL: 'http://localhost:8082',
  timeout: 300000,
  progress: p => 100 * (p.loaded / p.total)
});
instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default instance