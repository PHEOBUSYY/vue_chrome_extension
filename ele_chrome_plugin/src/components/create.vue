<template>
  <el-form ref="form" :model="form" label-width="80px">
    <!--<el-alert-->
      <!--v-show="showSucess"-->
      <!--title="提示"-->
      <!--type="success"-->
      <!--description="创建成功"-->
      <!--show-icon>-->
    <!--</el-alert>-->
    <!--<el-alert-->
      <!--v-show="showError"-->
      <!--title="提示"-->
      <!--type="error"-->
      <!--description="已存在相同的网站"-->
      <!--show-icon>-->
    <!--</el-alert>-->
    <el-form-item label="名称">
      <el-input prefix-icon="el-icon-news" clearable v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="网址">
      <el-input prefix-icon="el-icon-document" clearable v-model="form.url"></el-input>
    </el-form-item>
    <el-form-item label="收藏">
      <el-switch v-model="form.isStar"></el-switch>
    </el-form-item>
    <el-form-item label="禁用">
      <el-switch v-model="form.isForbid"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="goBack">取消</el-button>
    </el-form-item>
  </el-form>


</template>
<script>
  export default {
    data() {
      return {
        form: {
          frequency: 1,
          title: '',
          url: '',
          isStar: false,
          isForbid: false,
        },
//        showError: false,
//        showSucess:false
      }
    },
    props: {},
    methods: {
      onSubmit() {
        console.log('submit!');
        let webData = JSON.parse(window.localStorage.getItem('webData'));
        if (webData && (webData instanceof Array)) {
          let found = false;
          webData.forEach((item) => {
            if (item.url === this.form.url) {
//              this.showError = true;
              found = true;
              this.$message({
                message: '已有相同的网站记录',
                type: 'error'
              });
//              setTimeout(()=> {
//                this.showError = false;
//              },1500)
            }
          });
          if(!found){
            webData.push(this.form);
//            this.showSucess = true;
            window.localStorage.setItem('webData',JSON.stringify(webData));
              this.$message({
                message: '记录创建成功',
                type: 'success'
              });
              this.$router.go(-1);
          }
        }
      },
      goBack: function () {
        this.$router.go(-1);
      }
    }
  }
</script>
