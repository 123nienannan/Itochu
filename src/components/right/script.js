import fetch from '@/utils/fetch'
import {getAdminList,getCompanyList,addAdmin,deleteAdmin,updateAdmin} from '@/utils/api'
export default {
  name: "Right",
  data () {
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
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
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
    //添加管理员
    addadminUser () {
      this.$refs.addAdminForm.validate((valid) => {
        if (valid) {
         fetch({method:'post',url:addAdmin},{...this.addAdminForm}).then(res => {
           this.addAdmin = false
           this.totalPage += 1
           this.curPage = Math.ceil((this.totalPage + 1) / this.pageSize)
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
    amendAdmin(admin) {
      this.showAmendDialog = true
      this.amendAdminForm.userName = admin.userName
      this.amendAdminForm.phone = admin.phone
      this.amendAdminForm.userNumber = admin.userNumber
      this.amendAdminForm.email = admin.email
      this.amendAdminForm.companyName = admin.companyName
      this.amendAdminForm.password = admin.password
      this.amendNeedCondition.userId = admin.userId
      this.amendNeedCondition.companyId = admin.companyId
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
