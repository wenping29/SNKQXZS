// comm/login/login.js
//index.js
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
      // this.setData({})
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
      console.log(this.data.userCode, this.data.userPassWord)
      that.setData({ loading: true, closeTimeText: "完成打开" })
      // let that = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'login',
        // 传给云函数的参数
        data: {
          userCode: that.data.userCode,
          userPassWord: that.data.userPassWord
        },
        success: function (res) {
          console.log(res.result) // 3
          if (res.result.data.value === 1){
            // console.log()
            console.log(app.globalData)
            app.globalData.userInfo.userCode = that.data.userCode
            that.setData({ loading: false, closeTimeText: "完成打开" })
            wx.setStorage({
              userCode: that.data.userCode,
              openid: app.globalData.userInfo.openid
            })
            that.triggerEvent('login', res.result.data,{})
          } else if (res.result.data.value === 2) {
            that.setData({ loading: false, closeTimeText: "完成打开" })
            wx.showToast({
              title: '名称密码错误！',
              // icon: 'failure',
              duration: 2000
            })
          }
        },
        fail: console.error
      })

    }

  }
})
