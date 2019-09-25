const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    userCode: '',
    userPassWord: '',
  },
  loading:false,
  onLoad:function(){
  },

  /**
   * 组件的方法列表
   */
  methods: {
    register(){
      this.triggerEvent('register', {}, {})
    },
    codebindinput(e){
      this.data.userCode = e.detail.value
      this.setData({data:{
        userCode: e.detail.value
      }})
    },
    pwdbindinput(e) {
      this.data.userPassWord = e.detail.value
      this.setData({ data:{
        userPassWord: e.detail.value
      } })
    },
    login(){
      const that = this
      that.setData({ loading: true, closeTimeText: "完成打开" })
      // console.log('loginfo', app.globalData.userInfo)
      console.log('loginfo', {
        userCode: that.data.userCode,
        userPassWord: that.data.userPassWord,
        openid: app.globalData.userInfo.openid,
        nickName: app.globalData.userInfo.nickName
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'login',
        // 传给云函数的参数
        data: {
          userCode: that.data.userCode,
          userPassWord: that.data.userPassWord,
          openid: app.globalData.userInfo.openid,
          nickName: app.globalData.userInfo.nickName
        },
        success: function (res) {
          console.log('登陆成功', res)
          if (res.result.data.value === 1){
            app.globalData.userInfo.userCode = that.data.userCode
            that.setData({ loading: false, closeTimeText: "完成打开" })
            app.globalData.saveLogInfo({
              userCode: that.data.userCode,
              password: that.data.userPassWord,
              openid: res.result.openid
            })
            that.triggerEvent('login', res.result.data,{})
          } else if (res.result.data.value === 2) {
            that.setData({ loading: false, closeTimeText: "完成打开" })
            wx.showToast({
              title: '名称密码错误！',
              duration: 2000
            })
          }
        },
        fail: console.error
      })
    }
  }
})
