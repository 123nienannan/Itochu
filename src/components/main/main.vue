<template>
  <div class="wrapper">
    <el-container class="main">
      <el-aside class="aside" width="100px">
        <div class="menu">
          <img src="@/assets/images/menu.png">
        </div>
        <ul>
          <li>
            <el-tooltip class="item" effect="dark" content="人员管理" placement="right">
                <router-link :to="{name: 'UserList'}">
                <i class="side_icon icon-user"></i>
                </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="特殊人员" placement="right">
              <router-link :to="{name: 'userVipList'}">
                <i class="side_icon icon-special"></i>
              </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="考勤管理" placement="right">
              <router-link :to="{name: 'testMange'}">
                <i class="side_icon icon-calendar"></i>
              </router-link>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="出入记录" placement="right">
              <router-link :to="{name: 'Access'}">
                <i class="side_icon icon-access"></i>
              </router-link>
            </el-tooltip>
          </li>
          <li v-if="showAdmin">
            <el-tooltip class="item" effect="dark" content="管理员" placement="right">
              <router-link :to="{name: 'rightAdmin'}">
                <i class="side_icon icon-admin"></i>
              </router-link>
            </el-tooltip>
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
      showAdmin: false
    };
  },
  mounted() {
    this.getType()
  },
  methods: {
    async getType() {
      const res = await fetch({ method: "get", url: getAdminType })
      console.log(res);
      this.loginName = res.data.data.userName;
      if (res.data.data.type == 1) {
        this.showAdmin = true
      } else {
        this.showAdmin = false
      }
    },
    async handleCommand() {
      const res = await fetch({ method: "post", url: loginOut })
      localStorage.removeItem('token')
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        box-sizing: border-box;
        border-bottom: solid 1px #e6e7e9;
        img {
          width: 20px;
          height: 20px;
        }
      }
      ul {
        margin-top: 100px;
        li {
          a {
            position: relative;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.router-link-active {
              background-color: #ecf5ff;
              &::after {
                content: "";
                width: 5px;
                height: 60px;
                position: absolute;
                top: calc(50%-30px);
                right: 0;
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
      height:100px!important;
      line-height: 100px;
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
          margin-top: 20px;
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
.el-aside,
.el-main {
  overflow: hidden;
}
.el-main {
  overflow: auto;
      padding: 50px 150px 0px 50px !important;
}
.el-popper {
    margin-top: 20px !important;
  }
</style>



