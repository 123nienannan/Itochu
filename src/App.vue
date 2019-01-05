<template>
  <div id="app">
    <router-view  v-wechat-title='$route.meta.title'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-table__empty-text {
  line-height: 60px;
}
</style>
