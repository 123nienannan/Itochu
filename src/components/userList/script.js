import fetch from '@/utils/fetch'
import Exif from 'exif-js'
import {staffAuditStatus,staffAuditStatusList,uploadBase64ByPersonId,getCompanyList,getAparmentList,getAllUserList,importPersonExcel,sendLink} from '@/utils/api'
export default {
  name: "userList",
  data () {
    return {
      companyVal: '',
      departmentVal: '',
      uploadpicVal: '',
      searchText: '',
      company: [],
      department: [],
      pageSize:8,
      curPage: 1,
      totalPage: 0,
      pictures: [
        {
          picId: "1",
          label: '已上传照片'
        },
        {
          picId: "2",
          label: '未上传照片'
        }
      ],
      listData: [],
      editInfo: false,
      uploadNeedId : "",
      checked: {
        personId: '',
        auditStatus: 2
      },
      picValue: '',
      personIds: [],
      vals: []

    }
  },
  mounted () {
    this.getCompanyList()
    this.getAparmentList()
    this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
  },
  methods: {
    //员工审核
    async operation (personId,auditStatus) {
      const res = await fetch({method:'post',url:staffAuditStatus},{personId,auditStatus})
      this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //批量员工审核
    handleSelection (val) {
      if(val != "") {
        val.map((item,index)=>{
          if(item.auditStatus===1){
            item.checked = true
            this.personIds.push(item.personId)
          }
        })
      }else {
       this.listData.forEach((item) => {
         item.checked = false
       })
      }
    },
    changePassOrReject(info) {
        if(info.checked) {
          this.personIds.push(info.personId)
        }
    },
    async bulkPass () {
       const res = await fetch({method:'post',url:staffAuditStatusList},{personIds:this.personIds,auditStatus:'2'})
       this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    async bulkReject () {
      const res = await fetch({method:'post',url:staffAuditStatusList},{personIds:this.personIds,auditStatus:'3'})
      this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //修改头像
    amendUploadPic (e,id) {
      this.uploadNeedId = id
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
      console.log(this.uploadNeedId)
      let res = await fetch({url: uploadBase64ByPersonId, method: 'post'}, {file: data, personId:this.uploadNeedId})
      this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
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
   async sendLink (id) {

      const res =await fetch({method:'post',url:sendLink},{perosnId:id})
      this.$message({
        message: '发送链接成功',
        type: 'success'
      });
      // this.$router.push({name:"LinkPage"})
    },
    async getAllUserList (pageNum,pageSize,companyId,departmentId,imgType,personName ) {
      const params = {
          personType:1,
          pageNum,
          pageSize,
          companyId,
          departmentId,
          imgType,
          personName
      }
      const res = await fetch({method:'get',url:getAllUserList},params)
      res.data.data.content.map((item,index)=>{
        return item.checked = false
      })
      this.listData=res.data.data.content
      this.totalPage = res.data.data.total
    },
    async getCompanyList () {
      const res = await fetch({method:"get",url:getCompanyList})
      const {data} = res.data
      this.company = data
    },

    async getAparmentList (id) {
      const res = await fetch({method:'get',url:getAparmentList},{companyId:id})
      const {data} = res.data
      this.department = data
    },

    filteSearch () {
      this.curPage = 1
      this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
      // this.companyVal = ""
      // this.departmentVal = ""
      // this.uploadpicVal = ""
      // this.searchText = ""
    },

    getCurPage (curPage) {
      this.curPage = curPage
      this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
