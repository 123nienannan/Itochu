import fetch from '@/utils/fetch'
import Exif from 'exif-js'
import {staffAuditStatus,staffAuditStatusList,getCompanyList,getAparmentList,getAllUserList,addSpecialPerson,deletePerson,getPersonDetail,updateSpecialPerson,uploadBase64} from '@/utils/api'
export default {
  name: "userListVip",
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
      checkedPic: false,
      headerPic: require('@/assets/images/logo.png'),
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
      checkValue: false,
      personIds: []
    }
  },
  mounted () {
    this.getCompanyList()
    this.getAparmentList()
    this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
  },
  methods: {
    handleSelection (val) {
      if(val != '') {
        val.forEach((item) => {
          if(item.auditStatus == 1) {
            this.checkValue = true
            this.personIds.push(item.personId)
          }
        })
      }else {
        this.checkValue = false
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
    //员工审核
    async operation (personId,auditStatus) {
      const res = await fetch({method:'post',url:staffAuditStatus},{personId,auditStatus})
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
    },
    //上传图片所需要的方法
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
      let res = await fetch({url: uploadBase64, method: 'post'}, {file: data})
      this.headerPic = res.data.data
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
    //点击添加按钮出现弹框
    addSpecialUser () {
        this.showaddSpUserDialog = true
    },
    cancleAction () {
      this.showaddSpUserDialog = false
      this.$refs.addSpecialUserForm.resetFields()
    },
    cancleEdit () {
      this.editInfo = false
    },
    locationChange () {
     this.addSpecialNeedCondition.companyId = this.addSpecialUserForm.companyName
    },
    departmentChange () {
      this.addSpecialNeedCondition.departmentId = this.addSpecialUserForm.departmentName
    },
    //点击添加按钮
    addSpecialPerson () {
      this.addSpecialNeedCondition.photoUrl = this.headerPic,
      this.$refs.addSpecialUserForm.validate((valid) => {
        if (valid) {
          fetch({method:'post',url:addSpecialPerson},{...this.addSpecialUserForm,...this.addSpecialNeedCondition}).then(res => {
            this.showaddSpUserDialog = false
            this.curPage = 1
            this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
            this.$refs.addSpecialUserForm.resetFields()
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
      this.addSpecialNeedCondition.companyId = data.companyId
      this.addSpecialNeedCondition.departmentId = data.departmentId
      this.addSpecialNeedCondition.personId = data.personId
    },
    editSpecialPerson () {
      fetch({method:'post',url:updateSpecialPerson},{...this.editSpecialUserForm, ...this.addSpecialNeedCondition}).then(res => {
        this.editInfo = false
        this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
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
          this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
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
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
      this.companyVal = ""
      this.departmentVal = ""
      this.uploadpicVal = ""
      this.searchText = ""
    },

    getCurPage (curPage) {
      this.curPage = curPage
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
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
