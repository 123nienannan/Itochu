<template>
<div class="wrap">
  <div class="login_box">
    <div class="login_top">
      <div class="login_pic">
        <img src="@/assets/images/logo.png">
      </div>
      <div class="login_title">伊藤忠后台管理系统</div>
    </div>
    <h2>登录</h2>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="username">
          <img class="usernamepng" src="@/assets/images/icon-username.png">
        <el-input class="input" v-model="loginForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <img class="passwordpng" src="@/assets/images/icon-password.png">
        <el-input class="input" v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" @click="login">登录</el-button>
        <img class="line" src="@/assets/images/icon-arrow-right.png">
      </el-form-item>
    </el-form>

  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // login () {
    //     this.$refs.loginForm.validate((valid) => {
    //       if (valid) {
    //         alert('submit!');
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    login () {
      // this.$router.push({name: 'Main'})
      this.$router.push({name: "UserList"})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.wrap{
  width:100vw;
  height:100vh;
  // background-color:#f9f9f9;
  background-image: linear-gradient(-45deg, 
		#e6e9ed 0%, 
		#f9f9f9 100%);
}
.login_box {
  box-shadow: 1px 4px 1px #e9e9e9;
  background-color: #fff;
  padding: 10px 50px 10px 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .login_top {
    display: flex;
    padding-left: 50px;
    padding-top:50px;
  }
  .login_pic {
    width: 111px;
    height: 47px;
  }
  .login_pic img {
    width: 100%;
    height: 100%;
  }
  .login_title {
    font-size: 18px;
    color:#333;
    line-height: 3.8;
    padding-left: 20px;
  }
  h2 {
    padding-bottom: 25px;
    padding-left: 50px;
    color: #333;
    font-weight: normal;
  }
  .btn {
    float: right;
    width: 112px;
    height: 35px;
    background-color: #4f86ff;
    border-radius: 23px;
    color: #fff;
    line-height: 11px;
    text-align: left;
  }
  .el-form-item {
    position: relative;
    img {
      width: 21px;
    	height: 24px;
      position: absolute;
      z-index: 5;
    }
    .usernamepng {
      left: 17px;
      top: 6px;
    }
    .passwordpng {
      left: 17px;
      top: 6px;
    }
    .line {
      width: 30px;
      height: 12px;
      right: 18px;
      top: 13px;
    }
  }
}
</style>
<style>
 .el-form-item__content {
    margin-left: 50px !important;
    }
  .el-input__inner {
    text-indent: 3em !important;
    outline: none;
    border: 0;
    box-shadow: 0px 8px 20px 4px 
		rgba(86, 97, 129, 0.08);
  }
  /* .el-input {
   width: 100%;
  } */
</style>

