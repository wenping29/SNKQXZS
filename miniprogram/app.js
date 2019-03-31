//app.js
import uitl from './uitls'
var userCode = wx.getStorage('userCode')
var openid = wx.getStorage('openid')
// console.log(userCode,'userCode')
let userInfo = null
if (userCode && openid){
  userInfo = {
    userCode,
    openid
  }
}
// console.log(userInfo)
App({
  globalData:{
    userInfo: userInfo
  },
  getUserInfo: function (cb){
    var that = this;
    userinfo: {
      userCode,
      openid
    }
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (!that.globalData.userInfo){
            that.globalData.userInfo = {}
          }
          that.globalData.userInfo.openid = res.code
          // console.log(that.globalData.userInfo)

          typeof cb == "function" && cb(that.globalData.userInfo)


 
        }
      });
    }
    // wx.login({
    //   success: function (res) {
    //     console.log(res)
    //     wx.getUserInfo({
    //       success: function (res) {
    //         var userInfo = res.userInfo
    //         var nickName = userInfo.nickName
    //         var avatarUrl = userInfo.avatarUrl
    //         var gender = userInfo.gender //性别 0：未知、1：男、2：女 
    //         var province = userInfo.province
    //         var city = userInfo.city
    //         var country = userInfo.country
    //         this.globalData.userInfo = userInfo
    //         userInfo.openid = res.code
    //         console.log(userInfo)
    //       }
    //     })
    //   }
    // });

  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    this.globalData = {}

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

  }
})
