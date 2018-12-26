import fetch from '@/utils/fetch'
import Exif from 'exif-js'
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
      checkedPicture: false,
      checkedamendPicture:false,
      headerPic: '',
      editheaderPic: "",
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
        ],
      },
      picValue: '',
      listPicVal: '',
      uploadNeedId: '',
      edituploadVal: ''
    }
  },
  mounted () {
    this.getadminType()
    this.getCompanyList()
    this.getAparmentList()
    this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
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
     //列表页面里修改头像
     amendUploadPic (e,id) {
      this.uploadNeedId = id
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.listPicVal = files[0]
      this.imagePreview(this.listPicVal)
    },
    imagePreview (file) {
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
            self.postImage(this.result)
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.postImage(data)
            }
          }
        }
      }
    },
    async postImage (data) {
      let res = await fetch({url: uploadBase64ByPersonId, method: 'post'}, {file: data, personId:this.uploadNeedId})
      this.getAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //员工审核
    async operation (personId,auditStatus) {
      const res = await fetch({method:'post',url:staffAuditStatus},{personId,auditStatus})
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //点击修改里面的上传头像
    editUploadFile (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.edituploadVal = files[0]
      this.editImgPreview(this.edituploadVal)
    },
    editImgPreview (file) {
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
            self.editPostImg(this.result)
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              self.editPostImg(data)
            }
          }
        }
      }
    },
    async editPostImg (data) {
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data})
      this.editheaderPic = res.data.data
    },

    //点击添加按钮里面的上传图片所需要的方法
    uploadFile(e){
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
      console.log("lalalal")
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data})
      this.headerPic = res.data.data
      this.checkedPicture = false
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
    //点击添加按钮
    addSpecialPerson () {
      this.addSpecialNeedCondition.photoUrl = this.headerPic
      if(this.addSpecialNeedCondition.photoUrl == "") {
        this.checkedPicture = true
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
          return false;
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
      this.editheaderPic = data.photoUrl
      this.addSpecialNeedCondition.companyId = data.companyId
      this.addSpecialNeedCondition.departmentId = data.departmentId
      this.addSpecialNeedCondition.personId = data.personId
    },
    editSpecialPerson () {
      fetch({method:'post',url:updateSpecialPerson},{...this.editSpecialUserForm, ...this.addSpecialNeedCondition}).then(res => {
        this.editInfo = false
        this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyValId,this.departmentVal,this.uploadpicVal,this.searchText)
      })
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

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
