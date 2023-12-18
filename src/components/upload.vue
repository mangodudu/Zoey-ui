<!--
 * @Author: zoey
 * @Date: 2023-11-05 18:32:44
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-07 20:30:16
 * @Description: 请填写简介
-->
<template>
  <div class="zoey-upload">
    <div class="zoey-uploader-imagelist">
      <ul class="preview-images-list">
        <li v-for="(file,index) in tempImages" :key="index">
        <span class="preview-delete-icon" @click="deleteImage(index)">
          <i class="zoey-icon-delete"></i>
        </span>
        <img :src="file.url" alt="">
        </li>
      </ul>
    </div>
<div class="zoey-uploader-container" 
@dragover="event=>prevent(event)"
@dragenter="event=>prevent(event)"
@click="event=>handelFileUploader(event,'click')"
@drop="event=>handelFileUploader(event,'drop')">

  <div class="uploader-area">
      <slot></slot>
      <div class="zoey-uploader--text">
        <slot name="text"></slot>
      </div>
      </div>
    </div>
    <input type="file" class="zoey-file__invisible" @change="getFile($event)" ref="file" :multiple="multiple">
    <div class="zoey-uploader--tip">
        <slot name="tip">
      </slot>
</div>
  </div>
</template>
<script>
export default {
  name:'ZoeyUpload',
  props: {
      accept: {
        type: String,
        default: ''
      },
      size: {
        type: Number
      },
      uploadSuccess:{
        type:Function
      },
      onError:{
        type:Function
      },
      drag:{
        type:Boolean,
        default:false
      },
      multiple:{
        type:Boolean,
        default:false
      },
      limit:{
        type:Number,
      }
    },
  data() {
    return {
      sourceFiles:[],
      tempImages:[],
      previewImages:[]
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    handelFileUploader(event,type){
      let handler={
        click:()=>{
          this.$refs.file.click()
        },
        drop:()=>{
          if(this.drag){
            event.preventDefault()
          this.sourceFiles=event.dataTransfer.files
          }
        },
      }
      handler[type]()
    },
    handleImage(fileList){
      this.tempImages=fileList.map((file)=>{
        const url=URL.createObjectURL(file)
        let temp={}
        temp.url=url
        temp.fileName=file.name
        return temp
      })
    },
    deleteImage(index){
      if(this.tempImages[index]!==undefined){
        if(index==this.tempImages.length-1){
          this.tempImages.pop()
        }
        else if(index==0){
          this.tempImages.shift()
        }
        else{
          this.tempImages=this.tempImages.slice(0,index).concat(this.tempImages.slice(index+1))

        }
      }
    },
    getFile(event){
      console.log(event.target.files)
      this.sourceFiles=event.target.files
    },
    prevent(event){
      event.preventDefault()
    },
  },
  watch:{
    sourceFiles(value){
      let files=Array.from(value)
      if(files.length<=0) return
      let {size,accept}=this
      if(files.some(file=>file.size>size)){
       return this.onError(`文件最大上传${size}k`)
      }
      if(files.some(file=>!~accept.indexOf(file.type))){
       return this.onError(`只接受${accept}类型的文件`)
      }
      console.log("files:",files)
      this.handleImage(files)
    },
    tempImages(value){
      if(value.length>this.limit){
        return this.onError(`只接受${this.limit}个文件`)
      }
      console.log("处理后的images")
      console.log(value)
    }
  }
}
</script>
<style lang="less">
.zoey-file__invisible {
  display: none;
}

.zoey-uploader-imagelist {
  display: flex;
}

.zoey-uploader--tip {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
}

.zoey-uploader--text {
  color: #606266;
  font-size: 14px;
  text-align: center;

  em {
    color: #409eff;
    font-style: normal;
  }
}

// 预览图片列表
.preview-images-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    width: 148px;
    height: 148px;
    margin-right: 10px;
    overflow: hidden;
    position: relative;

    &:hover {
      .preview-delete-icon {
        opacity: 1;
        background: rgba(0, 0, 0, 0.6);
        padding: 5px;
      }
    }

    // display: flex;
    // justify-content:center;
    // align-items: center;
    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }
  }

  .preview-delete-icon {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #fff;
    font-size: 30px;
    cursor: pointer;
  }
}

.uploader-area {
  min-width: 148px;
  height: 148px;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dotted #ccc;
  font-size: 28px;
  cursor: pointer;
}
</style>
