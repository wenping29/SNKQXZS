//index.js
const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    requestResult: '',
    searchData:[],
    currentPage:'login'
  },
  onGetUserInfo:function(res){
    this.avatarUrl = res.detail.userInfo.avatarUrl
  },
  onGetOpenid:function(){
    var that = this
  },
  onLoad: function(options) {
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    let that = this
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      if (userInfo.userCode) {
        wx.redirectTo({
          url: '../checkForm/checkForm',
        })
      }
    })
    if(app.globalData.currentPage === 'clockOut') {
      this.setData({ currentPage: 'clockOut' })
    } else {
      // console.log(options, 'options')
      if (options.title === '打开下班') {
        this.setData({ currentPage: 'clockOut' })
      } else if (options.title === '查询投入度') {
        this.setData({ currentPage: 'search' })
      }
    }

  },
  backHandler(){
    this.setData({ currentPage: 'login' })
  },
  backhomeHandler(){
    this.setData({ currentPage: 'grid' })
  },
  backGridHandler(){
    this.setData({ currentPage: 'grid' })
    // console.log('backGridHandler')
  },
  registerHandler(e){
    this.setData({ currentPage:'register'})
  },
  registerPageHandler(e){
    // console.log('registerPageHandler', e.detail)
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'register',
      // 传给云函数的参数
      data: {
        contry: e.detail.countryIndex,
        likething: e.detail.likething,
        name: e.detail.name,
        password: e.detail.password,
        usercode: e.detail.userCode
      },
      success: function (res) {
        // console.log(res.result) // 
      //  
        if (res && res.result){
          if (res.result.errMsg) {
            if (res.result.errMsg ==='collection.add:ok'){
              that.currentPage = 'login'
              wx.showToast({
                title: '注册成功！',
                icon: 'loading',
                duration: 2000
              })
              that.setData({ currentPage: 'login' })
              return
            }
          }
          if (res.result.msg && res.result.msg === '已经注册') {
            wx.showToast({
              title: res.result.msg,
              icon: 'loading',
              duration: 1000
            })
          }
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '查询错误！',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },
  loginHandler(e){
    if (e.detail.value == 1) {
      // this.data.currentPage = 'clockOut'
      this.setData({ currentPage:'clockOut'})
      // wx.navigateTo({
      //   url: './../checkForm/checkForm',
      // })
    }
  },
  searchHandler(e){
    this.setData({ currentPage: 'search' })
  },
  showResultHandler(e){
    // console.log(e,'showResultHandler')
    this.setData({ currentPage: 'result', searchData:e.detail.data.data })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
  }
})
