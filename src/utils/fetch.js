import axios from 'axios'
import { Message } from 'element-ui'
import router from "../router"

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {

  return config
})
axios.interceptors.response.use(function (res) {
  return res
}, function (error) {
  return Promise.reject(error)
})
const fetch = (opts, data) => {
  let httpDefaultOpts = {
    method: opts.method,
    url: opts.url,
    timeout: 10000,
    params: data,
    data: data,
    headers: opts.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        if(res.data.errcode == -1) {
          router.push({name:"Login"})
          Message({
            type: "error",
            message: res.data.message
          })
        }
        if (res.data.success) {
          resolve(res)
        } else {
          Message({
            type: "error",
            message: res.data.message
          })
        }
      }
    ).catch(
      (err) => {
        console.log('err' + err)
      }
    )
  })
  return promise
}
export default fetch
