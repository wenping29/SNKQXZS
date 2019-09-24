//app.js
import uitl from './uitls'
let userInfo = {}
console.log(userInfo, 'userInfo')
const getLogInfo = function() {
  try {
    var userCode = wx.getStorage('userCode')
    var openid = wx.getStorage('openid')
    console.log(userCode, 'userCode')
    var password = wx.getStorage('password')
    // let userInfo = null
    if (userCode && openid && password) {
      userInfo = {
        userCode,
        openid
      }
      return {
        userCode,
        password,
        openid
      }
    }
    if (value) {
    }
    return null
  } catch (e) {
    return null
  }
}

const saveLogInfo =function (data) {
  try {
    for(var key in data) {
      wx.setStorageSync(key, data[key])
    }
    console.log(data)
  } catch (e) { 

  }
}
App({
  globalData:{
    userInfo: userInfo,
    saveLogInfo: saveLogInfo,
    getLogInfo: getLogInfo
  },
  getUserInfo: function (cb){
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    console.log(JSON.stringify(this.globalData), 'this.globalData')
    let userinfo_ = getLogInfo()
    // console.log(userinfo_, 'get userinfo_传给云函数的参数')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    if (userinfo_) {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'login',
        // 传给云函数的参数
        data: {
          userCode: userinfo_.userCode,
          userPassWord: userinfo_.userPassWord
        },
        success: function (res) {
          console.log(res.result, '传给云函数的参数') // 3
          if (res.result.data.value === 1) {
            this.globalData.currentPage = 'clockOut'
          }
        },
        fail: console.error
      })
    }
  }
})
