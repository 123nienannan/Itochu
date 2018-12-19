// const baseUrl="http://192.168.0.108:8097/itochuweb"
const baseUrl="/itochuweb"      //根api
const getCompanyList=baseUrl+"/getAllCompany"   //获取全部公司
const login=baseUrl+"/user/login"  //登录接口
const getAparmentList = baseUrl + "/getAllDepartMent" //获取某公司的全部部门
const getAllUserList = baseUrl + "/getAllInnerPerson" //获取所有人员列表
const getAllAttendanceList = baseUrl + "/getAllAttendanceList" //考勤列表
const getAllAccessList = baseUrl + "/getAllAccessList" //出入记录列表
const getAdminList = baseUrl + "/getAdminList" // 管理员列表
const importAccessExcel = baseUrl + '/importAccessExcel' //查询出入批量导出
const importAttendanceExcel = baseUrl + '/importAttendanceExcel' //考勤管理批量导出
const addAdmin = baseUrl + '/addAdmin' //添加管理员
const deleteAdmin = baseUrl + '/deleteAdmin' //删除某一条管理员记录
const updateAdmin = baseUrl + '/updateAdmin' //修改某一条管理员记录



export {
  login,
  getCompanyList,
  getAparmentList,
  getAllUserList,
  getAllAttendanceList,
  getAllAccessList,
  getAdminList,
  importAccessExcel,
  importAttendanceExcel,
  addAdmin,
  deleteAdmin,
  updateAdmin,
}
