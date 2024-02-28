//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
    name: "user",
    //数据状态
    initialState: {
        //token: localStorage.getItem('token_key') || ''
        token: getToken() || '',
        userInfo: {},
    },
    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //localStorage也存一份
            //localStorage.setItem('token_key', action.payload)
            _setToken(action.payload)
            //console.log(getToken())
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            //这里每行中间不能加‘,’号
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

//解构出actionCreater函数
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

//异步方法 完成登陆获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await loginAPI(loginForm)
        //2.提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}

//获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await getProfileAPI()
        //2.提交同步action进行token的存入
        dispatch(setUserInfo(res.data))
    }
}

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }

//获取reducer函数
const userReducer = userStore.reducer

export default userReducer