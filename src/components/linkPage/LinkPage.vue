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
       <div class="mask" v-show="visibleMask">待审核...</div>
       <div class="savePic"><img :src="pictureUpload"></div>
  </div>
  <div class="link_button">
    <span>
       上传头像
       <input @change="uploadPicture" type="file">
    </span>
  </div>
  <div class="link_tip">
    请上传正面未经PS照片
  </div>
  <div class="link_btn">
    <span @click="confirm">确定</span>
  </div>
</div>
</div>
</template>

<script>
import fetch from "@/utils/fetch"
import Exif from 'exif-js'
import {getPersonDetail,uploadBase64,staffBindPhoto} from "@/utils/api"
export default {
  data () {
    return {
    personId:"",
    linkName: "",
    linkNumber: "",
    picValue: '',
    pictureUpload: "",
    visibleMask: false
    }
  },
  mounted () {
    const personId = this.$route.query.personId
    this.personId = personId
    this.getPersonDetail({personId:this.personId})
  },
  methods: {
    uploadPicture (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this.imgPreview(this.picValue)
    },
    imgPreview (file) {
      let self = this
      let Orientation
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          if (this.result.length <= (100 * 1024)) {
            self.postImg(this.result)
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.postImg(data)
            }
          }
        }
      }
    },
    async postImg (data) {
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data, personId:this.personId})
      this.pictureUpload = res.data.data
      this.visibleMask = true
    },
    rotateImg (img, direction, canvas) {
      const minStep = 0
      const maxStep = 3
      if (img == null) return
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let width = img.width
      let height = img.height
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      let count
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1)
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:
            this.rotateImg(img, 'left', canvas)
            break
          case 8:
            this.rotateImg(img, 'right', canvas)
            break
          case 3:
            this.rotateImg(img, 'right', canvas)
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    },
    async getPersonDetail (option) {
      const res = await fetch({method:'get',url:getPersonDetail},option)
      const {data} = res.data
      console.log(data)
      this.pictureUpload = data.photoUrl
      if(data.status == 1) {
        this.visibleMask = true
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
      background: url("../../assets/images/background_logo.png") no-repeat center center;
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

