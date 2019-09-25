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
    currentPage:'login',
    showLoginPage: true
  },
  onGetUserInfo:function(res){
    this.avatarUrl = res.detail.userInfo.avatarUrl
  },
  onGetOpenid:function(){
    var that = this
  },
  onLoad: function(options) {
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
      if (options.title === '打开下班') {
        this.setData({ currentPage: 'clockOut' })
        this.setData({ showLoginPage: false })
      } else if (options.title === '查询投入度') {
        this.setData({ currentPage: 'search' })
        this.setData({ showLoginPage: false })
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
  },
  registerHandler(e){
    this.setData({ currentPage:'register'})
  },
  registerPageHandler(e){
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
      this.setData({ currentPage:'clockOut'})
      this.setData({ showLoginPage: false })
    }
  },
  searchHandler(e){
    this.setData({ currentPage: 'search' })
    this.setData({ showLoginPage: false })
  },
  showResultHandler(e){
    this.setData({ currentPage: 'result', searchData:e.detail.data.data })
  },
  bindGetUserInfo(e) {
    // console.log(e)
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserInfo',
      // 传给云函数的参数
      data: {
        nickName: e.detail.userInfo.nickName
      },
      success: function (res) {
        let userinf = {}
        // console.log(res, 'res')
        if (res.result.value.value == '1' && res.result.value.data.find(v => v.nickName === e.detail.userInfo.nickName)) {
          let item = res.result.value.data.find(v => v.nickName === e.detail.userInfo.nickName)
          userinf.userCode = item.usercode
          userinf.password = item.password
          userinf.openid = res.result.openid
          userinf.nickName = item.nickName
          that.setData({ userInfo: userinf })
          // 存储至localstore
          app.globalData.saveLogInfo({
            userCode: item.usercode,
            password: item.password,
            openid: res.result.openid,
          })
          // console.log(app.globalData.userInfo, 'app.globalData.userInfo')
          that.setData({ currentPage: 'clockOut' })
          that.setData({ showLoginPage: false })
          //设置全局userinfo
          app.globalData.userInfo.userCode = item.usercode
          app.globalData.userInfo.password = item.password
        } else {
          that.setData({ currentPage: 'login' })
          that.setData({ showLoginPage: false })
        }
        //设置全局userinfo
        app.globalData.userInfo.openid = res.result.openid
        app.globalData.userInfo.nickName = res.result.event.nickName
        // console.log(app.globalData.userInfo, 'app.globalData.userInfo')
      },
      fail: function (res) {
        that.setData({ currentPage: 'login' })
        that.setData({ showLoginPage: false })
      }
    })
  }
})
