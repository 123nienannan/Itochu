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
              <img src="@/assets/images/1-1emp.png">
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'userVipList'}">
              <img src="@/assets/images/1-1special.png">
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'testMange'}">
              <img src="@/assets/images/1-1calendar.png">
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'Access'}">
              <img src="@/assets/images/1-1access.png">
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'rightAdmin'}">
              <img src="@/assets/images/1-1admin.png">
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
             <span>您好，李思达</span>
             <div class="logout">
               <span @click="signOut"><img src="@/assets/images/1-1arrow.png"></span>
               <ul v-show="backLogout">
                 <li>退出</li>
               </ul>
             </div>
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
export default {
  data () {
    return {
     backLogout: false
    }
  },
  methods: {
   signOut() {
     this.backLogout = true
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
            }
          }
          img {
            width: 30px;
            height: 30px;
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
</style>



