<template>
<div class="link_main">
  <div class="wapper_link">
  <div class="link_top">
    <p>信息采集</p>
  </div>
  <div class="link_name">
    {{linkName}}
  </div>
  <div class="link_title">
    <span>NO. {{linkNumber}}</span>
  </div>
  <div class="link_content">
       <img src="../../assets/images/background_logo.png">
  </div>
  <div class="link_button">
    <span>
       上传头像
       <input type="file">
    </span>
  </div>
  <div class="link_tip">
    请上传正面未经PS照片
  </div>
  <div class="link_btn">
    <span>确定</span>
  </div>
</div>
</div>
</template>

<script>
import fetch from "@/utils/fetch"
import {getPersonDetail} from "@/utils/api"
export default {
  data () {
    return {
    personId:"",
    linkName: "",
    linkNumber: ""

    }
  },
  mounted () {
    const personId = this.$route.query.personId
    this.personId = personId
    this.getPersonDetail({personId:this.personId})
  },
  methods: {
    async getPersonDetail (option) {
      const res = await fetch({method:'get',url:getPersonDetail},option)
      const {data} = res.data
      this.linkName = data.personName
      this.linkNumber = data.staffNumber
      console.log(data)
    }

  },

}
</script>

<style scoped lang="less">
::-webkit-scrollbar {
display: none;/*隐藏滚轮*/
}
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
.link_main {
  background-image: linear-gradient(-45deg,
		#e6e9ed 0%,
		#f9f9f9 100%);
  width:100vw;
  height:100vh;
  .wapper_link {
    box-sizing: border-box;
    padding: 0 45px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
    .link_top {
      box-sizing: border-box;
      width: 100%;
      padding: 40px 0 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      p {
        color: #003491;
        font-size: 28px;
      }
    }
    .link_content {
      margin: 0 auto;
      margin-top: 60px;
      border-radius: 50%;
      width: 160px;
      height: 160px;
      position: relative;
      background-color: #ffffff;
      box-shadow: 0px 8px 20px 4px
        rgba(0, 0, 0, 0.08);
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 144px;
        height: 60px;
      }
    }
    .link_tip {
      width: 100%;
      text-align: center;
      color: #8c94ac;
      font-size: 14px;
      padding-top: 16px;
    }
    .link_name {
      width: 100%;
      color: #000;
      font-size: 24px;
      padding-top: 36px;
    }
    .link_button {
      padding-top: 43px;
     text-align: center;
     span {
       font-size: 24px;
       display: inline-block;
       position: relative;
       width: 224px;
       height: 46px;
       line-height: 46px;
       background-color: #ffffff;
       border-radius: 35px;
       border: solid 1px #e6e7e9;
       input {
         position: absolute;
         top: 0;
         left: 0;
         display: inline-block;
         width: 100%;
         height: 100%;
         opacity: 0;
       }
     }
    }
    .link_title {
      width: 100%;
      padding-top: 17px;
      span {
        padding: 2px;
        display: inline-block;
        width: 90px;
        height: 26px;
        background-color: #ffbf6b;
        border-radius: 13px;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
      }
    }
    .link_btn {
      width: 100%;
      padding-top: 25px;
      text-align: center;
      span {
        cursor: pointer;
        color: #fff;
        font-size: 16px;
        display: inline-block;
        width: 320px;
        height: 46px;
        line-height: 46px;
        background-color: #4c83ff;
        border-radius: 23px;
      }
    }
  }
}


</style>

