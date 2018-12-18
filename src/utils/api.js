// const baseUrl="http://192.168.0.108:8097/itochuweb"
const baseUrl="/itochuweb"      //根api
const getCompanyList=baseUrl+"/getAllCompany"   //获取全部公司
const login=baseUrl+"/user/login"  //登录接口
const getAparmentList = baseUrl + "/getAllDepartMent" //获取某公司的全部部门
const getAllUserList = baseUrl + "/getAllInnerPerson" //获取所有人员列表
const getAllAttendanceList = baseUrl + "/getAllAttendanceList" //考勤列表
const getAllAccessList = baseUrl + "/getAllAccessList" //出入记录列表





export {
  login,
  getCompanyList,
  getAparmentList,
  getAllUserList,
  getAllAttendanceList,
  getAllAccessList
}
