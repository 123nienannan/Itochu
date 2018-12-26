<template>
  <div class="wrap">
    <div class="login_box">
      <div class="login_pic">
        <img src="@/assets/images/logo.png">
        <p>伊藤忠后台管理系统</p>
      </div>
      <h2 class="title">登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label-width="0" prop="username">
          <img class="usernamepng" src="@/assets/images/icon-username.png">
          <el-input class="input" v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
          <img class="passwordpng" src="@/assets/images/icon-password.png">
          <el-input class="input" type="password"  v-model="loginForm.password" @keyup.enter.native="login('loginForm')" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-wrap">
            <button class="btn-login" @click.prevent="login('loginForm')">登录<i class="icon-arrow-right"></i></button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import fetch from "@/utils/fetch";
import { login } from "@/utils/api";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          fetch({ method: "post", url: login }, this.loginForm ).then(
            res => {
              console.log("22222")
              res.data.data.token = "token"
              localStorage.setItem('token', res.data.data.token)
              this.$router.push({ name: "UserList" })
            }
          );
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(-45deg, #e6e9ed 0%, #f9f9f9 100%);
}
.login_box {
  box-shadow: 1px 4px 1px #e9e9e9;
  background-color: #fff;
  width: 556px;
  box-sizing: border-box;
  padding: 60px 75px 50px;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  .login_pic {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 70px;
    img {
      margin-right: 20px;
    }
    p {
      font-size: 18px;
      color: #333;
    }
  }
  h2.title {
    font-size: 28px;
    color: #333;
    font-weight: normal;
    margin-bottom: 40px;
  }
  .el-form-item {
    position: relative;
    margin-bottom: 40px;
    .usernamepng {
      width: 21px;
      height: 24px;
      position: absolute;
      z-index: 2;
      left: 40px;
      top: calc(50% - 12px);
    }
    .passwordpng {
      width: 20px;
      height: 23px;
      position: absolute;
      z-index: 2;
      left: 40px;
      top: calc(50% - 12px);
    }
  }
  .btn-wrap {
    text-align: right;
    .btn-login {
      display: inline-flex;
      align-items: center;
      width: 132px;
      height: 46px;
      background-color: #4f86ff;
      border: none;
      padding: 0 20px;
      font-size: 16px;
      color: #ffffff;
      justify-content: space-around;
      border-radius: 23px;
      outline: none;
    }
    .icon-arrow-right {
      width: 30px;
      height: 12px;
      background: url("./../../assets/images/icon-arrow-right.png") no-repeat;
    }
  }
}
</style>
<style lang="less">
.wrap {
  .el-input__inner {
    height: 46px;
    line-height: 46px;
    padding-left: 100px;
    outline: none;
    font-size: 16px;
    color: #afb3bf;
    border: 0;
    box-shadow: 0px 8px 20px 4px rgba(86, 97, 129, 0.08);
  }
}
</style>

