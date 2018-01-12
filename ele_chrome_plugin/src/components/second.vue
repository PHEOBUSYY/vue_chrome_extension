<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <div>
          <span>
             用户管理
          </span>
        <el-button type="text" size="mini" plain @click="clear">测试</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
      配置管理
      <el-checkbox v-model="checked">主报销单</el-checkbox>
      <el-checkbox v-model="checked">主借款单</el-checkbox>
      <el-checkbox v-model="checked">费用申请单</el-checkbox>
      <el-checkbox v-model="checked">费用预提单</el-checkbox>
    
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
    export default {
        data() {
            return {
              activeName: 'first'
            }
        },
        props: {}
    }
</script>
