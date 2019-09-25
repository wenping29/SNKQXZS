const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date:String
  },
  attached () {
    let datestr = new Date().format('yyyy-MM')
    this.date = datestr
    this.setData({ date: datestr })
  },
  /**
   * 组件的初始数据
   */
  data: {
    userPassWord:'',
    loading:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindinput(e){
      this.data.userPassWord = e.detail.value
    },
    bindDateChange(e) {
      this.setData({ date: e.detail.value })
      this.date = e.detail.value
    },
    search(){
      let that = this
      let userCoe = app.globalData.userInfo.userCode
      let userPassWord = this.data.userPassWord
      this.setData({ loading:true})
      wx.cloud.callFunction({
        // 云函数名称
        name: 'query',
        // 传给云函数的参数
        data: {
          userCode: userCoe,
          searchDate:this.date,
          userPassWord: userPassWord
        },
        success: function (res) {
          that.setData({ loading: false })
          if (res && res.result.msg && res.result.msg ==='密码错误'){
            wx.showToast({
              title: '密码错误',
            })
          } else {
            that.triggerEvent('showResult', res.result, {})
          }
        },
        fail: function(e){
          that.setData({ loading: false })
        }
      })
    },
    back(){
      this.triggerEvent('back', {}, {})
    }
  }
})
