//axios的封装处理
import axios from "axios";
import { getToken, removeToken } from "./token";
import { clearUserInfo } from "@/store/modules/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import router from "@/router";

//1.根域名配置
//2.超时时间
//3.请求拦截器/响应拦截器
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 添加请求拦截器
// 在请求发送之前 做拦截 插入一些自定义的配置 【参数的处理】
request.interceptors.request.use((config)=> {
    //操作这个config 注入token数据
    //1.获取到token
    //2.按照后端的格式要求做token拼接
    const token = getToken()
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //监控401 token失效
    if(error.response.status===401){
      //您位于 Axios 响应拦截器内，它不是 React 组件，因此您不能像<Navigate>这里一样使用 JSX 或 React 组件。
      //为什么不使用navigate('/login')：该useNavigate钩子是一个 React 钩子，提供命令式导航的功能。
      //但是，钩子只能在 React 函数组件或自定义钩子内部使用。由于您处于 Axios 拦截器中，它不是组件，因此您不能useNavigate在此处使用钩子。
      //const dispatch = useDispatch()
      //const navigate = useNavigate()
      //dispatch(clearUserInfo())
      removeToken()
      //为什么router.navigate('/login')使用：它似乎router是对提供命令式导航方法的路由器实例的引用navigate。
      //这种方法允许您以编程方式导航到 React 组件之外的不同路由，这适合在 Axios 拦截器中使用。
      router.navigate('/login')
      window.location.reload()
    }
    return Promise.reject(error)
})


export { request }