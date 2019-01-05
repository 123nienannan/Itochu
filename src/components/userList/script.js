import fetch from '@/utils/fetch'
import EXIF from 'exif-js'
import {getAdminType,staffAuditStatus,staffAuditStatusList,uploadBase64ByPersonId,getCompanyList,getAparmentList,getAllUserList,importPersonExcel,sendLink} from '@/utils/api'
export default {
  name: "userList",
  data () {
    return {
      companyVal: '',
      companyValId: '',
      departmentVal: '',
      uploadpicVal: '',
      searchText: '',
      company: [],
      department: [],
      pageSize:10,
      curPage: 1,
      totalPage: 0,
      showStatusFour:false,
      showBulkUpload: true,
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
      vals: [],
      type: ''

    }
  },
  created() {
    this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
  },
  mounted () {
    this.getadminType()
    this.getCompanyList()
    this.getAparmentList()
  },
  methods: {
    //员工审核
  async getadminType() {
    const res = await fetch({method:'get',url:getAdminType})
    this.type=res.data.data.type
    if(this.type != 1) {
      this.companyVal = res.data.data.companyName
      this.companyValId = res.data.data.companyId
      this.showBulkUpload = false
     }
  },
    companyChange() {
      this.companyValId = this.companyVal
    },
    async operation (personId,auditStatus) {
      const res = await fetch({method:'post',url:staffAuditStatus},{personId,auditStatus})
      this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //批量员工审核
    handleSelection (val) {
      this.personIds = []
      if(val != "") {
        val.map((item,index)=>{
          if(item.auditStatus===1){
            item.checked = true
            this.personIds.push(item.personId)
            console.log(this.personIds)
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
        }else {
          this.personIds.forEach((item,index) => {
            if(item == info.personId) {
              this.personIds.splice(index,1)
            }
          })
        }
        console.log(this.personIds)
    },
    async bulkPass () {
      console.log(this.personIds)
      if(this.personIds.length == 0) {
        return false
      }
       const res = await fetch({method:'post',url:staffAuditStatusList},{personIds:this.personIds,auditStatus:'2'})
       this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
       this.personIds = []
    },
    async bulkReject () {
      if(this.personIds.length == 0) {
        return false
      }
      const res = await fetch({method:'post',url:staffAuditStatusList},{personIds:this.personIds,auditStatus:'3'})
      this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
      this.personIds = []
    },
    //修改头像
    amendUploadPic (e,id) {
      let that = this
      this.uploadNeedId = id
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
      let res = await fetch({url: uploadBase64ByPersonId, method: 'post'}, {file: data, personId:this.uploadNeedId})
      this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
      this.showStatusFour = true
    },
    async sendLink (id) {
      const res =await fetch({method:'post',url:sendLink},{perosnId:id})
      this.$message({
        message: '发送链接成功',
        type: 'success'
      });
      // this.$router.push({name: 'LinkPage'})
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
      this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },

    getCurPage (curPage) {
      this.curPage = curPage
      this.getAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
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
