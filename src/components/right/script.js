import fetch from '@/utils/fetch'
import {getAdminList,getCompanyList,addAdmin,deleteAdmin,updateAdmin,getAdminDetail} from '@/utils/api'
export default {
  name: "Right",
  data () {
   var validateMoblie = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机格式'))
      }else {
        callback()
      }
    };
    var validateEmail = (rule, value, callback) => {
      let email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (!email.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
      }else {
        callback()
      }
    };
    return {
      addAdmin: false,
      showAmendDialog: false,
      companys:[],
      curPage:1,
      pageSize:3,
      totalPage:0,
      adminListData:[],
      amendAdminForm: {
        userName: '',
        email: '',
        phone: '',
        companyName: '',
        userNumber: '',
        password: ''
      },
      amendNeedCondition: {
        userId:'',
        companyId: ''
      },
      addAdminForm: {
        userName: '',
        email: '',
        phone: '',
        companyName: '',
        userNumber: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          { validator: (rule, value, callback)=>{validateEmail(rule, value, callback)},  trigger: 'blur' },
        ],
        phone: [
          { validator: (rule, value, callback)=>{validateMoblie(rule, value, callback)}, trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '请输入归属地', trigger: 'change' },
        ],
        userNumber: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
    mounted() {
      this.getAdminList(this.curPage,this.pageSize)
      this.getAllCompany()
    },
    methods: {
      changeamendCondtion () {
        this.amendNeedCondition.companyId = this.amendAdminForm.companyName
      },
      changeCondition () {
        this.amendNeedCondition.companyId = this.addAdminForm.companyName
      },
      //添加管理员
      addadminUser () {
        this.$refs.addAdminForm.validate((valid) => {
          if (valid) {
          fetch({method:'post',url:addAdmin},{...this.amendNeedCondition, ...this.addAdminForm}).then(res => {
            this.addAdmin = false
            this.curPage = 1
            this.getAdminList(this.curPage,this.pageSize)
            this.$refs.addAdminForm.resetFields()
          })
          } else {
            return false;
          }
        });
      },
      cancleAddAdmin () {
        this.$refs.addAdminForm.resetFields()
        this.addAdmin = false
      },
    //删除管理员
    deleteAdmin (id) {
      this.$confirm('您是否确定删除该管理员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch({method:'post',url:deleteAdmin},{userId:id}).then(res => {
          this.curPage=1
          this.getAdminList(this.curPage,this.pageSize)
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
    //点击按钮管理员数据回显
    amendAdmin (admin) {
      this.showAmendDialog = true
      fetch({method:'get',url:getAdminDetail},{userId:admin.userId}).then(res => {
        const {data} = res.data
        this.amendAdminForm.userName = data.userName
        this.amendAdminForm.phone = data.phone
        this.amendAdminForm.userNumber = data.userNumber
        this.amendAdminForm.email = data.email
        this.amendAdminForm.companyName = data.companyName
        this.amendAdminForm.password = data.password
        this.amendNeedCondition.companyId = data.companyId
        this.amendNeedCondition.userId = data.userId
      })
    },
    cancleAmendAdmin () {
      this.showAmendDialog = false
    },
    async getAllCompany () {
      const res = await fetch({method:'get',url:getCompanyList})
      const {data} = res.data
      this.companys = data
    },
    amendAdminUser () {
      fetch({method:'post',url:updateAdmin},{...this.amendNeedCondition,  ...this.amendAdminForm}).then(res => {
        this.showAmendDialog = false
        this.getAdminList(this.curPage,this.pageSize)
      })
    },
    async getAdminList (pageNum,pageSize) {
      const params = {
        pageNum,
        pageSize
      }
      const res = await fetch({method:'get',url:getAdminList},params)
      const {content,total } = res.data.data
      this.adminListData = content
      this.totalPage = total

    },
    getCurPage (curPage) {
      this.curPage = curPage
      this.getAdminList(this.curPage,this.pageSize)
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
