import fetch from '@/utils/fetch'
import {getAllAttendanceList,importAttendanceExcel} from '@/utils/api'
export default {
  name: "textMange",
  data () {
    return {
      attendanceDate: '',
      curPage:1,
      pageSize:10,
      totalPage:0,
      attendanceList:[]
    }
  },
  mounted () {
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
    async importAttendance () {
     const res = await fetch({method:'post',url:importAttendanceExcel},{attendanceDate:this.attendanceDate})
     const {data} = res.data
     window.location.href = data
    }
  }
}
