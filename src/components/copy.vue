<!--
 * @Author: zoey
 * @Date: 2023-11-15 10:07:23
 * @LastEditors: zoey
 * @LastEditTime: 2023-11-16 14:57:34
 * @Description: 请填写简介
-->
<template>
  <div>
    <zoey-button type="primary" icon="zoey-icon-record" :click="copy()">复制</zoey-button>
    <input type="text" id="copye" v-model="mes">
  </div>
</template> 
<script>
export default {
  name: 'ZoeyCopy',
  data() {
    return {
      mes: ''
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
  }

}
</script>
<style lang="less" scoped></style>
