import fetch from '@/utils/fetch'
import { getAllAccessList,importAccessExcel} from '@/utils/api'
export default {
  name: "Access",
  data() {
    return {
      loading: false,
      accessDate: '',
      curPage: 1,
      pageSize: 10,
      totalPage: 0,
      accessList: []
    }
  },
  created() {
    this.getAllAccessList(this.curPage, this.pageSize, this.accessDate)
  },
  methods: {
    async getAllAccessList(pageNum, pageSize, accessDate) {
      const params = {
        accessDate,
        pageNum,
        pageSize
      }
      const res = await fetch({
        method: "get",
        url: getAllAccessList
      }, params)
      const {
        content,
        total
      } = res.data.data
      this.accessList = content
      this.totalPage = total
    },
    changeDate() {
      this.curPage = 1
      this.getAllAccessList(this.curPage, this.pageSize, this.accessDate)
    },
    getCurPage(curPage) {
      this.curPage = curPage
      this.getAllAccessList(this.curPage, this.pageSize, this.accessDate)
    },
    importAccess() {
      this.loading = true
       setTimeout(() => {
        this.loading = false
      }, 5000)
      const f = document.getElementsByTagName("form")[0]
      f.action="/itochuweb/importAccessExcel?accessDate="+this.accessDate
    }
  }
}
