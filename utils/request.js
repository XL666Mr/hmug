import Fly from 'flyio/dist/npm/wx'
import toast from './toast'
const fly = new Fly()

fly.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
fly.config.timeout = 30000

//添加请求拦截器
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  request.headers["X-Tag"] = "flyio";
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    toast.err("网络错误")
    return Promise.resolve("ssss")
  }
)


export default fly
