<template>
<div class="link_main">
  <div class="wapper_link">
    <div class="saveWaterPic"></div>
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
       <div class="mask" v-show="visibleMask">{{showText}}</div>
       <!-- <div class="mask" v-show="visibleMask">已驳回...</div> -->
       <div class="savePic"><img :src="pictureUpload"></div>
  </div>
  <div class="link_button">
    <span>
       上传头像
       <input @change="uploadPicture" accept="image/*" type="file">
    </span>
  </div>
  <div class="link_tip">
    请上传正面未经PS照片
  </div>
  <div class="link_btn">
    <span @click="confirm">完成</span>
  </div>
</div>
</div>
</template>

<script>
import fetch from "@/utils/fetch"
import EXIF from 'exif-js'
import {getPersonDetailBase64,uploadBase64,staffBindPhoto} from "@/utils/api"
export default {
  name: 'link',
  data () {
    return {
    personId:"",
    linkName: "",
    linkNumber: "",
    picValue: '',
    pictureUpload: "",
    visibleMask: false,
    showText: ''
    }
  },
  mounted () {
    const personId = this.$route.query.personId
    this.personId = personId
    this.getPersonDetailBase64({code:this.personId})
  },
  methods: {
    uploadPicture (e) {
      let that = this
      let files = e.target.files || e.dataTransfer.files
      this.picValue = files[0]
      this.imgPreview(this.picValue)
      EXIF.getData(this.picValue, function () {
        that.Orientation = EXIF.getTag(this, 'Orientation')
      })
    },
    imgPreview (file) {
      let self = this
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let IMG = new Image()
          IMG.src = this.result
          IMG.onload = function () {
            let w = this.naturalWidth
            let h = this.naturalHeight
            let resizeW = 0
            let resizeH = 0
            let maxSize = {
              width: 1280,
              height: 1280,
              level: 0.5
            }
            if (w > maxSize.width || h > maxSize.height) {
              let multiple = Math.max(w / maxSize.width, h / maxSize.height)
              resizeW = w / multiple
              resizeH = h / multiple
            } else {
              resizeW = w
              resizeH = h
            }
            let canvas = document.createElement('canvas')
            let cxt = canvas.getContext('2d')
            if (self.Orientation === 3) {
              canvas.width = resizeW
              canvas.height = resizeH
              cxt.rotate(Math.PI)
              cxt.drawImage(IMG, 0, 0, -resizeW, -resizeH)
            } else if (self.Orientation === 8) {
              canvas.width = resizeH
              canvas.height = resizeW
              cxt.rotate(Math.PI * 3 / 2)
              cxt.drawImage(IMG, 0, 0, -resizeW, resizeH)
            } else if (self.Orientation === 6) {
              canvas.width = resizeH
              canvas.height = resizeW
              cxt.rotate(Math.PI / 2)
              cxt.drawImage(IMG, 0, 0, resizeW, -resizeH)
            } else {
              canvas.width = resizeW
              canvas.height = resizeH
              cxt.drawImage(IMG, 0, 0, resizeW, resizeH)
            }
            self.base64 = canvas.toDataURL('image/jpeg', maxSize.level)
            self.postImg(self.base64)
          }
        }
      }
    },
    async postImg (data) {
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data})
      this.pictureUpload = res.data.data
      this.visibleMask = true
      this.showText = "待审核..."
    },
    async getPersonDetailBase64 (option) {
      console.log(option)
      const res = await fetch({method:'get',url:getPersonDetailBase64},option)
      console.log(res)
      const {data} = res.data
      console.log(data)
      this.pictureUpload = data.photoUrl
      if(data.status == 1) {
        this.visibleMask = true
        this.showText = "待审核..."
      }
      if(data.status == 3) {
        this.visibleMask = true
        this.showText = "已驳回..."
      }
      this.linkName = data.personName
      this.linkNumber = data.staffNumber
    },
    async confirm () {
      const res = await fetch({method:'post',url:staffBindPhoto},{personId:this.personId,photoUrl:this.pictureUpload})
      this.$message({
          message: '信息完成',
          type: 'success'
        });
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
    position: relative;
    box-sizing: border-box;
    padding: 0 45px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
    .saveWaterPic {
      position: absolute;
      right: 0;
      top: 40px;
      width: 40%;
      height: 200px;
      background: url("../../assets/images/water.png") no-repeat;
      background-size: 100%;
    }
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
      background: url("../../assets/images/represent.png") no-repeat center center;
      margin: 0 auto;
      margin-top: 60px;
      border-radius: 50%;
      width: 160px;
      height: 160px;
      position: relative;
      background-color: #ffffff;
      box-shadow: 0px 8px 20px 4px
        rgba(0, 0, 0, 0.08);
        .mask {
          height: 160px;
          line-height: 160px;
          border-radius: 50%;
          position: absolute;
          text-align: center;
          width:160px;
          left: 0;
          overflow: hidden;
          z-index: 9;
          top: 0;
          color: #fff;
          font-size: 18px;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .savePic {
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          width: 100%;
          height: 100%;
          img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
         }
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
       font-size: 18px;
       display: inline-block;
       position: relative;
       width: 36%;
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
        padding: 3px;
        display: inline-block;
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
        width: 55%;
        height: 46px;
        line-height: 46px;
        background-color: #4c83ff;
        border-radius: 23px;
      }
    }
  }
}
</style>

