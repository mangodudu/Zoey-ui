<!--
 * @Author: zoey
 * @Date: 2023-11-22 19:10:30
 * @LastEditors: zoey
 * @LastEditTime: 2023-12-08 18:43:27
 * @Description: 请填写简介
-->
<template>
  <div>
    <div class="zoey-upload" @drop="handleDrop" @dragover="handleDragOver">
      <!-- 文件选择上传区域 -->
      <div class="zoey-upload-container">
        <div class="option-slot">
          <div class="trigger-slot" @click="event=>handelFileUploader(event,'trigger')">
            <slot name="trigger"></slot>
          </div>
          <div class="main-slot" @click="event=>handelFileUploader(event)">
            <slot>
            </slot>
          </div>
        </div>
        <input type="file" ref="file" :multiple="multiple" @change="getFiles($event)" v-show="false">
      </div>
    </div>
    <!-- 文件上传显示列表 -->
    <ul class="zoey-upload-list" v-if="showFileList">
      <li class="zoey-upload-list_item" v-for="(item,index) in currentFileList.fileArr" :key="index"
        @mouseover="showDelete" @mouseout="hideDelete" @click="event=>onPreview(event,index)">
        <div class="zoey-upload-list_item-container">
          <div class="zoey-upload-list_item-name">{{ item.name }}</div>
          <div class="zoey-upload-list_item-status-label">
            <i class="zoey-icon-ashbin" @click="deleteFile(index)" style="font-size:14px;"
              :style="{display:deleteshow?'block':'none'}"></i>
            <i class="zoey-icon-success" style="color: #67c23a;font-size:14px;"
              :style="{display:deleteshow?'none':'block'}" v-if="item.fileStatus==='success'"></i>
            <i v-if="item.fileStatus==='fail'" class="zoey-icon-error" style="color:#ff7c75 ;font-size:14px;"
              :style="{display:deleteshow?'none':'block'}"></i>
          </div>
        </div>
        <div class="zoey-upload-list_item-loading-box" v-if="item.fileStatus==='loading'">
          <div class="current-loading" :style="{width:item.percent+'%'}"></div>
          <div class="percent-val" v-if="item.fileStatus==='loading'">{{Math.round(item.percent)}}%</div>
        </div>
      </li>
    </ul>
    <!-- 底部 -->
    <div class="zoey-upload-tip">
      <slot name="tip"></slot>
    </div>
  </div>
</template>
<script>
  import axios from './request.js'
  import { reactive } from 'vue'
  export default {
    name: 'ZoeyUpload',
    props: {
      autoUpload: {
        type: [String, Boolean],
        default: true,
      },
      action: {
        type: String,
        require: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
      drag: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 1
      },
      showFileList: {
        type: Boolean,
        default: true
      },
      fileList: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    data() {
      return {
        fileStatus: '',
        percent: 0,
        deleteshow: false,
      }
    },
    setup() {
      const currentFileList = reactive({
        count: 0,
        fileArr: []
      })
      return {
        currentFileList
      }
    },
    computed: {
    },
    methods: {
      //控制文件列表图标显示
      showDelete() {
        this.deleteshow = true
      },
      hideDelete() {
        this.deleteshow = false
      },
      imporReeadeemCode: (data, index, url, callback) => {
        return axios.post(url, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress(progressEvent) {
            if (progressEvent.event.lengthComputable) {
              callback(progressEvent, index)
            }
          }
        })
      },
      //控制拖拽上传事件
      handleDrop(e) {
        e.preventDefault();
        if (this.drag) {
          let files = e.dataTransfer.files;
          for (let file of files) {
            const fileobj = {}
            fileobj.name = file.name
            fileobj.file = file
            fileobj.fileStatus = 'ready'
            this.currentFileList.fileArr.push(fileobj)
            this.currentFileList.count++
          }
          if (this.autoUpload) {
            this.fileUpload()
          }
          console.log(files)
        }
      },
      handleDragOver(e) {
        e.preventDefault();
      },
      //选择文件
      getFiles(e) {
        const files = e.target.files
        if (files) {
          for (let file of files) {
            if (this.currentFileList.count < this.limit) {
              const fileobj = {}
              fileobj.name = file.name
              fileobj.file = file
              fileobj.percent = 0
              fileobj.fileStatus = 'ready'
              this.currentFileList.fileArr.push(fileobj)
              this.currentFileList.count++
            }
            else {
              return
            }
          }
        }
      },
      //文件上传进度条回调
      uploadUnderWayCallback(progressEvent, index) {
        let percentCompleted = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(1)
        //console.log(percentCompleted, index)
        this.currentFileList.fileArr[index].percent = percentCompleted
      },
      //单个文件上传
      uploadSelf(file, index) {
        const currupload = new FormData()
        currupload.append('file', file)
        this.currentFileList.fileArr[index].percent = 0
        this.currentFileList.fileArr[index].fileStatus = 'loading'
        const onErrorStatus = this.$attrs.onOnError ? true : false
        this.imporReeadeemCode(currupload, index, this.action, this.uploadUnderWayCallback).then((res) => {
          if (res.status == 200) {
            console.log("上传成功")
            this.currentFileList.fileArr[index].percent = 100
            this.currentFileList.fileArr[index].fileStatus = 'success'
          } else {
            this.currentFileList.fileArr[index].fileStatus = 'fail'
            console.log("上传失败")
            throw new Error('upload filed')
          }
        }).catch(err => {
          this.currentFileList.fileArr[index].fileStatus = 'fail'
          if (onErrorStatus) {
            this.$emit('onError', err)
          }
        })
      },
      fileUpload() {
        if (this.currentFileList.count == 0) {
          console.log('nothing to upload')
          return
        }
        let currUploadCount = 0
        if (this.currentFileList.count) {
          for (let i = 0; i < this.currentFileList.count; i++) {
            if (this.currentFileList.fileArr[i].fileStatus == 'ready' && currUploadCount < this.limit) {
              this.uploadSelf(this.currentFileList.fileArr[i].file, i)
              currUploadCount++
            }
          }
        }
      },
      //控制自动上传文件
      async handelFileUploader(e, pramas) {
        if (pramas == 'trigger' && !this.autoUpload) {
          await this.$refs.file.click()
        } else {
          if (this.autoUpload) {
            await this.$refs.file.click()
          }
          this.fileUpload()
        }
      },
      //删除文件列表文件前钩子函数
      async beforeRemove(index) {
        if (this.$attrs.onBeforeRemove) {
          await this.$parent.beforeRemove(this.currentFileList.fileArr[index], this.currentFileList.fileArr).then(res => {
            this.currentFileList.fileArr[index].removeOption = res
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //删除文件列表文件
      async deleteFile(index) {
        await this.beforeRemove(index)
        const option = this.currentFileList.fileArr[index].removeOption
        if (option === 'cancle') return
        this.currentFileList.fileArr.splice(index, 1)
        this.currentFileList.count--
      },
      //点击文件列表钩子函数
      onPreview(event, index) {
        if (event.target.getAttribute('class').includes('zoey-icon')) {
          return
        }
        console.log(this.$attrs)
        if (this.$attrs.onPreview) {
          this.$emit.onPreview(this.currentFileList.fileArr[index])
        }

      }
    },
  }
</script>
<style lang="less" scoped>
  .zoey-upload {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    .zoey-upload-container {
      display: inline-block;
      width: auto;
      height: auto;

      .option-slot {
        width: auto;
        height: auto;
        /* display: flex;
        flex-direction: row; */
        display: inline-block;
        align-items: center;
        justify-content: center;

        .main-slot {
          font-size: 14px;
          color: #606266;
          display: inline-block;

          &:is(div) :is(em) {
            color: #409EFF;
            font-size: 14px;
            font-style: normal;
          }

          &:is(div) :is(i) {
            font-size: 28px;
            color: #C0C4CC;
          }
        }

        .trigger-slot {
          display: inline-block;
        }
      }


    }

    .zoey-upload-list {
      .zoey-upload-list_item:first-child {
        margin-top: 10px;
      }
    }
  }

  .zoey-upload-list_item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 5px;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;

    .zoey-upload-list_item-container {
      display: flex;
      align-items: center;
      justify-content: center;

      .zoey-upload-list_item-name {
        display: inline-block;
        color: #606266;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        transition: color 0.3s;
        white-space: nowrap;
      }

      .zoey-upload-list_item-status-label {
        display: inline-block;
        position: relative;
        margin-right: 10px;
      }
    }


    .zoey-upload-list_item-loading-box {
      width: 270px;
      height: 10px;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: center;

      .current-loading {
        height: 8px;
        border-radius: 4px;
        background-color: #67c23a
      }

      .percent-val {
        font-size: 8px;
        margin-left: 8px;
        color: #666;
      }
    }

    &:hover {
      .zoey-upload-list_item-container {
        cursor: pointer;
        background: #f5f7fa;

        .zoey-upload-list_item-name {
          color: #409eff;
        }
      }
    }
  }

  .zoey-upload-tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }
</style>