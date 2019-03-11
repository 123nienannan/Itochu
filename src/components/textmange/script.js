import fetch from '@/utils/fetch'
import {getAllAttendanceList,importAttendanceExcel} from '@/utils/api'
export default {
  name: "textMange",

  data () {
    return {
      loading: false,
      attendanceDate: '',
      curPage:1,
      pageSize:10,
      totalPage:0,
      attendanceList:[]
    }
  },
  created () {
    this.getAllAttendanceList(this.curPage,this.pageSize,this.attendanceDate)
  },
  methods: {
   async getAllAttendanceList (pageNum,pageSize,attendanceDate) {
     const params = {
      pageNum,
      pageSize,
      attendanceDate
     }
     const res = await fetch({method:"get",url:getAllAttendanceList},params)
     const {content} = res.data.data
     const {total} = res.data.data
     this.attendanceList = content
     this.totalPage = total
    },
    changeDate () {
      this.getAllAttendanceList(this.curPage,this.pageSize,this.attendanceDate)
    },
    getCurPage (curPage) {
      this.curPage = curPage
      this.getAllAttendanceList(this.curPage,this.pageSize,this.attendanceDate)
    },
    importAttendance () {
       this.loading = true
       setTimeout(() => {
        this.loading = false
      }, 5000)
      const form = document.getElementsByTagName("form")[0]
      form.action="/itochuweb/importAttendanceExcel?attendanceDate="+this.attendanceDate
    }
  }
}
