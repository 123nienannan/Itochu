<template>
  <div class="wrapper">
    <el-container class="main">
      <el-aside class="aside" width="70px">
        <div class="menu">
          <img src="@/assets/images/menu.png">
        </div>
        <ul>
          <li>
            <router-link :to="{name: 'UserList'}">
              <i class="side_icon icon-user"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'userVipList'}">
              <i class="side_icon icon-special"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'testMange'}">
              <i class="side_icon icon-calendar"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Access'}">
              <i class="side_icon icon-access"></i>
            </router-link>
          </li>
          <li v-if="showAdmin">
            <router-link :to="{name: 'rightAdmin'}">
              <i class="side_icon icon-admin"></i>
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
import fetch from '@/utils/fetch'
import {loginOut,getAdminType} from '@/utils/api'
export default {
  data () {
    return {
      loginName: '',
      showAdmin: false
    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    async getType () {
      const res =await fetch({method:'get',url:getAdminType})
      console.log(res)
      this.loginName = res.data.data.userName
      if(res.data.data.type == 1) {
        this.showAdmin = true
      }else {
        this.showAdmin = false
      }
    },
    async handleCommand () {
     const res = await fetch({method:'post',url:loginOut})
     this.$router.push({name: "Login"})
    }
  }

}
</script>

 <style lang="less" scoped>
 .wrapper {
    width:100vw;
    height:100vh;
    background-color: #f5f6fa;
    .main {
      height: 100%;
      .aside {
        background-color: #fff;
        border-right: 1px solid #e6e7e9;
        .menu {
          text-align: center;
          width: 70px;
          height: 70px;
          line-height: 70px;
          border-bottom: solid 1px #e6e7e9;
        img {
          width: 20px;
          height: 20px;
        }
      }
      ul {
        margin-top: 100px;
        li {
          a{
            position: relative;
            width:70px;
            height:80px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.router-link-active {
              background-color: #ecf5ff;
              &::after {
                content: '';
                width: 5px;
                height: 60px;
                position: absolute;
                top:calc(50%-30px);
                right: 0;
                background-color: #4c83ff;
              }
              .icon-user{
                background:url("./../../assets/images/icon-user-active.png") no-repeat;
              }
              .icon-special {
                background: url("./../../assets/images/icon-special-active.png") no-repeat;
                  }
              .icon-calendar {
                background: url("./../../assets/images/icon-calendar-active.png") no-repeat;
              }
              .icon-access {
                background: url("./../../assets/images/icon-access-active.png") no-repeat;
              }
              .icon-admin {
                background: url("./../../assets/images/icon-admin-active.png") no-repeat;
              }
            }
          }
          .side_icon {
            width:30px;
            height: 30px;
            background-size:cover;
          }
          .icon-user{
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
        line-height: 70px;
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
         margin-right: 30px;
         span {
           color: #003391;
         }
         .tempPic {
           width: 40px;
           height: 40px;
           border-radius: 50%;
           margin-top: 12px;
           margin-right: 7px;
           overflow: hidden;
           img {
             width: 100%;
             height: 100%;
           }
         }
         .logout {
           margin-right: 12px;
           width: 35px;
           position: relative;
           font-size: 15px;
           span {
             padding: 6px 13px;
           }
           ul {
             list-style: none;
             position: absolute;
             left: 4px;
             top: 21px;
             li {
               cursor: pointer;
             }
           }
         }
       }
      }
    }
 }

</style>
<style>
.el-aside, .el-main {
  overflow: hidden;
}
.wrapper .main .top_header[data-v-61fb690f] {
   height: 71px !important;
   background-color: #fff;
   border-bottom: 1px solid #e6e7e9;
}
.el-main {
  overflow: auto;
}
</style>



