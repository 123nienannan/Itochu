const baseUrl="/itochuweb"
// const baseUrl="/itochuweb"      //根api
const getCompanyList=baseUrl+"/getAllCompany?time="+Math.random()   //获取全部公司
const login=baseUrl+"/user/login?time="+Math.random()  //登录接口
const getAparmentList = baseUrl + "/getAllDepartMent?time="+Math.random() //获取某公司的全部部门
const getAllUserList = baseUrl + "/getAllInnerPerson?time="+Math.random() //获取所有人员列表
const getAllAttendanceList = baseUrl + "/getAllAttendanceList?time="+Math.random() //考勤列表
const getAllAccessList = baseUrl + "/getAllAccessList?time="+Math.random() //出入记录列表
const getAdminList = baseUrl + "/getAdminList?time="+Math.random() // 管理员列表
const importAccessExcel = baseUrl + '/importAccessExcel?time='+Math.random() //查询出入批量导出
const importAttendanceExcel = baseUrl + '/importAttendanceExcel?time='+Math.random() //考勤管理批量导出
const addAdmin = baseUrl + '/addAdmin?time='+Math.random() //添加管理员
const deleteAdmin = baseUrl + '/deleteAdmin?time='+Math.random() //删除某一条管理员记录
const updateAdmin = baseUrl + '/updateAdmin?time='+Math.random() //修改某一条管理员记录
const getAdminDetail = baseUrl + '/getAdminDetail?time='+Math.random() //获取管理员详情
const addSpecialPerson = baseUrl + '/addSpecialPerson?time='+Math.random() //添加特殊人员
const deletePerson = baseUrl + '/deletePerson?time='+Math.random() //删除特殊人员
const getPersonDetail = baseUrl + '/getPersonDetail?time='+Math.random() //获取特殊人员详情
const updateSpecialPerson = baseUrl + '/updateSpecialPerson?time='+Math.random() //修改特殊人员
const uploadBase64 = baseUrl + '/upload/base64?time='+Math.random() //base64上传图片
const importPersonExcel = baseUrl + '/importPersonExcel?time='+Math.random() //用户列表页批量导入
const sendLink = baseUrl  +  '/sendLink?time='+Math.random()  //发送链接邮件
const uploadBase64ByPersonId = baseUrl + '/uploadBase64ByPersonId?time='+Math.random() //修改头像
const staffAuditStatus = baseUrl + '/staffAuditStatus?time='+Math.random() //员工照片审核
const staffAuditStatusList = baseUrl + '/staffAuditStatusList?time='+Math.random() //员工照片批量审核
const loginOut = baseUrl + '/user/loginOut?time='+Math.random() // 退出登录
const getAdminType = baseUrl + '/getAdminType?time='+Math.random() //获取管理员信息类型
const staffBindPhoto = baseUrl + '/staffBindPhoto?time='+Math.random() //上传员工头像
const getPersonDetailBase64 = baseUrl + '/getPersonDetailBase64?time='+Math.random()
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
  getAdminDetail,
  addSpecialPerson,
  deletePerson,
  getPersonDetail,
  updateSpecialPerson,
  uploadBase64,
  importPersonExcel,
  sendLink,
  uploadBase64ByPersonId,
  staffAuditStatus,
  staffAuditStatusList,
  loginOut,
  getAdminType,
  staffBindPhoto,
  getPersonDetailBase64
}
