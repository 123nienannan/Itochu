import fetch from '@/utils/fetch'
import {getAllAccessList} from '@/utils/api'
export default {
  name: "Access",
  data () {
    return {
      accessDate: '',
      editInfo: false,
      adduser: false,
      curPage:1,
      pageSize:3,
      totalPage:0,
      accessList:[],
      formInline: {
        user: ''
      }
    }
  },
  mounted () {
    this.getAllAccessList(this.curPage,this.pageSize,this.accessDate)
  },
  methods: {
   async getAllAccessList (pageNum,pageSize,accessDate) {
     const params = {
      accessDate,
      pageNum,
      pageSize
     }
     const res = await fetch({method:"get",url:getAllAccessList},params)
     const {content,total} = res.data.data
     this.accessList = content
     this.totalPage = total
    },
    changeDate () {
      this.curPage = 1
      this.getAllAccessList(this.curPage,this.pageSize,this.accessDate)
    },
    getCurPage (curPage) {
      this.curPage = curPage
      this.getAllAccessList(this.curPage,this.pageSize,this.accessDate)
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
