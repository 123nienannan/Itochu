import fetch from '@/utils/fetch'
import {getAllAttendanceList} from '@/utils/api'
export default {
  name: "textMange",
  data () {
    return {
      attendanceDate: '',
      editInfo: false,
      adduser: false,
      curPage:1,
      pageSize:3,
      totalPage:0,
      attendanceList:[],
      formInline: {
        user: ''
      }
    }
  },
  mounted () {
    this.getAllAttendanceList(this.curPage,this.pageSize,this.attendanceDate)
  },
  methods: {
   async getAllAttendanceList (pageNum,pageSize,attendanceDate) {
     const params = {
      attendanceDate,
      pageNum,
      pageSize
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
