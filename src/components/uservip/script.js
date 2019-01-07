import fetch from '@/utils/fetch'
import EXIF from 'exif-js'
import {getAdminType,staffAuditStatus,uploadBase64ByPersonId,staffAuditStatusList,getCompanyList,getAparmentList,getAllUserList,addSpecialPerson,deletePerson,getPersonDetail,updateSpecialPerson,uploadBase64} from '@/utils/api'
export default {
  name: "userListVip",
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
      showPass:false,
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
      checkedPicture: false,
      checkedamendPicture:false,
      headerPic: '',
      pic: {
        editheaderPic: "",
      },
      addSpUserData: [],
      addSpecialNeedCondition: {
        companyId:'',
        departmentId:'',
        photoUrl:'',
        personId: ''
      },
      showaddSpUserDialog: false,
      editInfo:false,
      addSpecialUserForm: {
        personName: '',
        companyName: '',
        phone: '',
        companyMail: '',
        staffNumber: '',
        departmentName: '',
        personalMail: ''
      },
      editSpecialUserForm: {
        personName: '',
        companyName: '',
        phone: '',
        companyMail: '',
        staffNumber: '',
        departmentName: '',
        personalMail: ''
      },
      type:'',
      rules: {
        personName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '请选择考勤地点', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '请选择部门', trigger: 'blur' },
        ]
      },
      picValue: '',
      listPicVal: '',
      uploadNeedId: '',
      edituploadVal: ''
    }
  },
  created() {
    this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
  },
  mounted () {
    this.getadminType()
    this.getCompanyList()
    this.getAparmentList()
  },
  methods: {
    async getadminType() {
     const res = await fetch({method:'get',url:getAdminType})
      this.addSpecialNeedCondition.companyId = res.data.data.companyId
      this.type=res.data.data.type
      if(this.type != 1) {
       this.addSpecialUserForm.companyName = res.data.data.companyName
       this.companyVal = res.data.data.companyName
       this.companyValId = res.data.data.companyId
       this.editSpecialUserForm.companyName = res.data.data.companyName
      }
    },
    companyChange() {
      this.companyValId = this.companyVal
    },
     //列表页面里修改头像
     amendUploadPic (e,id) {
      let that = this
      this.uploadNeedId = id
      let files = e.target.files || e.dataTransfer.files
      this.listPicVal = files[0]
      this.imagePreview(this.listPicVal)
      EXIF.getData(this.listPicVal, function () {
        that.Orientation = EXIF.getTag(this, 'Orientation')
      })
    },
    imagePreview (file) {
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
            self.postImage(self.base64)
          }
        }
      }
    },
    async postImage (data) {
      let res = await fetch({url: uploadBase64ByPersonId, method: 'post'}, {file: data, personId:this.uploadNeedId})
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //员工审核
    async operation (personId,auditStatus) {
      const res = await fetch({method:'post',url:staffAuditStatus},{personId,auditStatus})
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //点击修改里面的上传头像
    editUploadFile (e) {
      let that = this
      let files = e.target.files || e.dataTransfer.files
      this.edituploadVal = files[0]
      this.editImgPreview(this.edituploadVal)
      EXIF.getData(this.edituploadVal, function () {
        that.Orientation = EXIF.getTag(this, 'Orientation')
      })
    },
    editImgPreview (file) {
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
            self.editPostImg(self.base64)
          }
        }
      }
    },
    async editPostImg (data) {
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data})
      this.pic.editheaderPic = res.data.data
      this.addSpecialNeedCondition.photoUrl = res.data.data
    },

    //点击添加按钮里面的上传图片所需要的方法
    uploadFile(e){
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
      console.log("lalalal")
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data})
      this.headerPic = res.data.data
      this.checkedPicture = false
    },
    cancleAction () {
      this.showaddSpUserDialog = false
      this.checkedPicture = false
      this.headerPic = ""
      this.$refs.addSpecialUserForm.resetFields()
    },
    cancleEdit () {
      this.editInfo = false
    },
    locationChange () {
     this.addSpecialNeedCondition.companyId = this.addSpecialUserForm.companyName
    },
    locationChangeamend() {
      this.addSpecialNeedCondition.companyId = this.editSpecialUserForm.companyName
    },
    departmentChange () {
      this.addSpecialNeedCondition.departmentId = this.addSpecialUserForm.departmentName
    },
    departmentChangeAmend () {
      this.addSpecialNeedCondition.departmentId = this.editSpecialUserForm.departmentName
    },
    checkEmail(email) {
      let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (reg.test(email)) {
        return true
      } else {
        return false
      }
    },
    checkPhone(phone) {
      let reg = /(^1[3-9]\d{9}$)|(^09\d{8}$)/
      if (reg.test(phone)) {
        return true
      } else {
        return false
      }
    },
    //点击添加按钮
    addSpecialPerson () {
      this.addSpecialNeedCondition.photoUrl = this.headerPic
      if(this.addSpecialNeedCondition.photoUrl == "") {
        this.checkedPicture = true
        return false
      }
      if(this.addSpecialUserForm.companyMail !=""  && !this.checkEmail(this.addSpecialUserForm.companyMail)){
        this.$message({
          message: '邮箱格式不正确',
          type: 'warning'
        });
        return false
      }
      if(this.addSpecialUserForm.personalMail != "" && !this.checkEmail(this.addSpecialUserForm.personalMail)){
        this.$message({
          message: '邮箱格式不正确',
          type: 'warning'
        });
        return false
      }
      if(this.addSpecialUserForm.phone !="" && !this.checkPhone(this.addSpecialUserForm.phone)){
        this.$message({
          message: '手机号码格式不正确',
          type: 'warning'
        });
        return false
      }
      this.$refs.addSpecialUserForm.validate((valid) => {
        if (valid) {
          fetch({method:'post',url:addSpecialPerson},{...this.addSpecialUserForm,...this.addSpecialNeedCondition}).then(res => {
            this.showaddSpUserDialog = false
            this.curPage = 1
            this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
            this.addSpecialNeedCondition.photoUrl = ""
            this.$refs.addSpecialUserForm.resetFields()
            this.headerPic = ""
            window.location.reload()
          })
        } else {
          return false
        }
      });
    },
    //点击修改按钮,出现弹框(数据回显)
    async amendSpecialUser(persons) {
      this.editInfo = true
      const res = await fetch({method:'get',url:getPersonDetail},{personId:persons.personId})
      const {data} = res.data
      this.editSpecialUserForm.personName = data.personName
      this.editSpecialUserForm.companyName = data.companyName
      this.editSpecialUserForm.phone = data.phone
      this.editSpecialUserForm.companyMail = data.companyMail
      this.editSpecialUserForm.staffNumber = data.staffNumber
      this.editSpecialUserForm.departmentName = data.departmentName
      this.editSpecialUserForm.personalMail = data.personalMail
      this.addSpecialNeedCondition.photoUrl = data.photoUrl
      this.pic.editheaderPic = data.photoUrl
      this.addSpecialNeedCondition.companyId = data.companyId
      this.addSpecialNeedCondition.departmentId = data.departmentId
      this.addSpecialNeedCondition.personId = data.personId
      if(data.photoUrl) {
        this.showPass = true
      }
    },
    editSpecialPerson () {
      if(this.editSpecialUserForm.companyMail !='' && !this.checkEmail(this.editSpecialUserForm.companyMail)){
        this.$message({
          message: '邮箱格式不正确',
          type: 'warning'
        });
        return false
      }
      if(this.editSpecialUserForm.personalMail !='' && !this.checkEmail(this.editSpecialUserForm.personalMail)){
        this.$message({
          message: '邮箱格式不正确',
          type: 'warning'
        });
        return false
      }
      if(this.editSpecialUserForm.phone !='' && !this.checkPhone(this.editSpecialUserForm.phone)){
        this.$message({
          message: '手机号码格式不正确',
          type: 'warning'
        });
        return false
      }
      this.$refs.editSpecialUserForm.validate((valid) => {
        if (valid) {
          fetch({method:'post',url:updateSpecialPerson},{...this.editSpecialUserForm, ...this.addSpecialNeedCondition, ...this.pic}).then(res => {
            this.editInfo = false
            this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
            // window.location.reload()
          })
        } else {
          return false
        }
      });
    },
    //点击删除按钮，删除某条特殊人员
    deleteSpecialUser (id) {
      this.$confirm('您是否确定删除该人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch({method:'post',url:deletePerson},{personId:id}).then(res => {
          this.curPage=1
          this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async getSpecialAllUserList (pageNum,pageSize,companyId,departmentId,imgType,personName) {
      const params = {
          personType:2,
          pageNum,
          pageSize,
          companyId,
          departmentId,
          imgType,
          personName
      }
      const res = await fetch({method:'get',url:getAllUserList},params)
      const {content} = res.data.data
      const {total} = res.data.data
      this.addSpUserData = content
      this.totalPage = total
    },
    async getCompanyList () {
      const res = await fetch({method:"get",url:getCompanyList})
      const {data} = res.data
      this.company = data
    },

    async getAparmentList () {
      const res = await fetch({method:'get',url:getAparmentList})
      const {data} = res.data
      this.department = data
    },

    filteSearch () {
      this.curPage = 1
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },

    getCurPage (curPage) {
      this.curPage = curPage
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },

    addhandleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done()
        this.$refs.addSpecialUserForm.resetFields()
        this.headerPic = ""
        this.checkedPicture = false
      })
      .catch(_ => {})
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
