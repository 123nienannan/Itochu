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
const getAdminDetail = baseUrl + '/getAdminDetail' //获取管理员详情
const addSpecialPerson = baseUrl + '/addSpecialPerson' //添加特殊人员
const deletePerson = baseUrl + '/deletePerson' //删除特殊人员
const getPersonDetail = baseUrl + '/getPersonDetail' //获取特殊人员详情
const updateSpecialPerson = baseUrl + '/updateSpecialPerson' //修改特殊人员
const uploadBase64 = baseUrl + '/upload/base64' //base64上传图片
const importPersonExcel = baseUrl + '/importPersonExcel' //用户列表页批量导入
const sendLink = baseUrl  +   '/sendLink'  //发送链接邮件
const uploadBase64ByPersonId = baseUrl + '/uploadBase64ByPersonId' //修改头像
const staffAuditStatus = baseUrl + '/staffAuditStatus' //员工照片审核
const staffAuditStatusList = baseUrl + '/staffAuditStatusList' //员工照片批量审核
const loginOut = baseUrl + '/user/loginOut' // 退出登录
const getAdminType = baseUrl + '/getAdminType' //获取管理员信息类型
const staffBindPhoto = baseUrl + '/staffBindPhoto' //上传员工头像
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
  staffBindPhoto
}
