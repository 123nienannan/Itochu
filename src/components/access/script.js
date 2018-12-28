import fetch from '@/utils/fetch'
import { getAllAccessList,importAccessExcel} from '@/utils/api'
export default {
  name: "Access",
  data() {
    return {
      accessDate: '',
      curPage: 1,
      pageSize: 10,
      totalPage: 0,
      accessList: []
    }
  },
  mounted() {
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
    async importAccess() {
      const res = await fetch({
        method: "post",
        url: importAccessExcel
      }, {
        accessDate: this.accessDate
      })
      const {
        data
      } = res.data
      window.location.href = data
    }
  }
}
