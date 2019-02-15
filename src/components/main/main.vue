<template>
  <div class="wrapper">
    <el-container class="main">
      <el-aside class="aside" :class="{shrink:asideShow,extend:!asideShow}">
        <div class="menu" v-if="shrink" >
          <img src="@/assets/images/menu.png" @click="showShrink">
        </div>
        <div class="anther-menu" v-if="!shrink">
          <span class="logo-text">ITOCHU</span>
          <img src="@/assets/images/anther-menu.png" @click="showextend">
        </div>
        <ul>
          <li>
                <router-link :class="{extened:showExtened}" :to="{name: 'UserList'}">
                  <i class="side_icon icon-user"></i>
                  <span class="title" v-if="show">人员管理</span>
                </router-link>
          </li>
          <li>
              <router-link :class="{extened:showExtened}" :to="{name: 'userVipList'}">
                <i class="side_icon icon-special"></i>
                <span class="title" v-if="show">特殊人员</span>
              </router-link>
          </li>
          <li>
              <router-link :class="{extened:showExtened}" :to="{name: 'testMange'}">
                <i class="side_icon icon-calendar"></i>
                <span class="title" v-if="show">考勤管理</span>
              </router-link>
          </li>
          <li>
              <router-link :class="{extened:showExtened}" :to="{name: 'Access'}">
                <i class="side_icon icon-access"></i>
                <span class="title" v-if="show">出入记录</span>
              </router-link>
          </li>
          <li v-if="showAdmin">
              <router-link :class="{extened:showExtened}" :to="{name: 'rightAdmin'}">
                <i class="side_icon icon-admin"></i>
                <span class="title" v-if="show">管理员</span>
              </router-link>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <el-header class="top_header">
           <div class="tip">
             <img src="@/assets/images/logo.png">
             <span>伊藤忠后台管理系统</span>
           </div>
           <div class="info">
             <div class="tempPic"><img src="@/assets/images/logo.png"></div>
               <el-dropdown @command="handleCommand" style="height: 40px;" trigger="click">
                  <span class="el-dropdown-link">你好
                    {{loginName}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
               </el-dropdown>
           </div>
        </el-header>
        <el-main class="content">
          <!-- 子路由的出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import fetch from "@/utils/fetch"
import { loginOut, getAdminType } from "@/utils/api"
export default {
  data() {
    return {
      loginName: "",
      showAdmin: false,
      shrink:true,
      show:false,
      asideShow:true,
      showExtened:true
    };
  },
  mounted() {
    this.getType()
  },
  methods: {
    showShrink () {
     this.asideShow = false
     this.show = true
     this.shrink = false
     this.showExtened = false
    },
    showextend () {
     this.asideShow = true
     this.show = false
     this.shrink = true
     this.showExtened = true
    },
    async getType() {
      const res = await fetch({ method: "get", url: getAdminType })
      this.loginName = res.data.data.userName;
      if (res.data.data.type == 1) {
        this.showAdmin = true
      } else {
        this.showAdmin = false
      }
    },
    async handleCommand() {
      const res = await fetch({ method: "post", url: loginOut })
      this.$router.push({ name: "Login" })
    }
  }
};
</script>

 <style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #f5f6fa;
  .main {
    height: 100%;
    .aside {
      background-color: #fff;
      border-right: 1px solid #e6e7e9;
      .menu {
        text-align: center;
        width: 80px;
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
        border-bottom: solid 1px #e6e7e9;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .anther-menu {
        padding-left: 20px;
        width: 160px;
        height: 80px;
        line-height: 80px;
        box-sizing: border-box;
        border-bottom: solid 1px #e6e7e9;
        .logo-text {
          padding-right: 8px;
          color: #003291;
          font-size: 22px;
          font-weight: 700;
        }
      }
      ul {
        li {
          a {
            text-decoration: none;
            color: #afb4c4;
            position: relative;
            width: 160px;
            height: 80px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            justify-content: center;
            &.extened {
              text-decoration: none;
              color: #afb4c4;
              position: relative;
              width: 80px;
              height: 80px;
              display: flex;
              align-items: center;
              box-sizing: border-box;
              justify-content: center;
            }
            &.router-link-active {
              background-color: #ecf5ff;
              color: #000;
              &::after {
                content: "";
                width: 4px;
                height: 80px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #4c83ff;
              }
              .icon-user {
                background: url("./../../assets/images/icon-user-active.png")
                  no-repeat;
              }
              .icon-special {
                background: url("./../../assets/images/icon-special-active.png")
                  no-repeat;
              }
              .icon-calendar {
                background: url("./../../assets/images/icon-calendar-active.png")
                  no-repeat;
              }
              .icon-access {
                background: url("./../../assets/images/icon-access-active.png")
                  no-repeat;
              }
              .icon-admin {
                background: url("./../../assets/images/icon-admin-active.png")
                  no-repeat;
              }
            }
            .title {
              padding-left: 10px;
            }
          }
          .side_icon {
            width: 30px;
            height: 30px;
            background-size: cover;
          }
          .icon-user {
            background: url("./../../assets/images/icon-user.png") no-repeat;
          }
          .icon-special {
            background: url("./../../assets/images/icon-special.png") no-repeat;
          }
          .icon-calendar {
            background: url("./../../assets/images/icon-calendar.png") no-repeat;
          }
          .icon-access {
            background: url("./../../assets/images/icon-access.png") no-repeat;
          }
          .icon-admin {
            background: url("./../../assets/images/icon-admin.png") no-repeat;
          }
        }
      }
    }
    .top_header {
      display: flex;
      height:80px!important;
      line-height: 80px;
      background-color: #fff;
      border-bottom: 1px solid #e6e7e9;
      .tip {
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        span {
          color: #333;
        }
        img {
          width: 80px;
          height: 33px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
      .info {
        display: flex;
        margin-right: 105px;
        span {
          color: #003391;
          font-size: 16px;
        }
        .tempPic {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-top: 5px;
          margin-right: 7px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
<style>
.el-main {
  overflow: hidden;
}
.el-aside {
 overflow: hidden;
}
.el-aside.shrink {
 width: 80px !important;
}
.el-aside.extend {
 width: 160px !important;
}
.el-main {
  overflow: auto;
      padding: 25px 150px 0px 50px !important;
}
ul.el-popper {
    margin-top: 25px !important;
    padding: 5px 0;
  }
</style>




