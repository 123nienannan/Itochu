import fetch from '@/utils/fetch'
import {getCompanyList,getAparmentList,getAllUserList} from '@/utils/api'
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
      pageSize:2,
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
      formInline: {
        user: ''
      }
    }
  },
  mounted () {
    this.getCompanyList()
    this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
  },
  methods: {
    async getSpecialAllUserList (pageNum,pageSize,companyId,departmentId,imgType,personName ) {
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
      this.listData = content
      this.totalPage = total
    },
    async getCompanyList () {
      const res = await fetch({method:"get",url:getCompanyList})
      const {data} = res.data
      this.company = data
    },

    changeVal() {
      this.getAparmentList(this.companyVal);
    },

    departmentChange () {
      // if(this.companyVal == "") {
      //   console.log(this.companyVal)
      //   this.$message.error("请选择公司")
      // }
    },

    async getAparmentList (id) {
      const res = await fetch({method:'get',url:getAparmentList},{companyId:id})
      const {data} = res.data
      this.department = data
    },

    filteSearch () {
      this.curPage = 1
      this.getSpecialAllUserList(this.curPage,this.pageSize,this.companyVal,this.departmentVal,this.uploadpicVal,this.searchText)
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
