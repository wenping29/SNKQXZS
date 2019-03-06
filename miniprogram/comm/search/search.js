// comm/search/search.js
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
    userPassWord:'',
    loading:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindinput(e){
      this.userPassWord = e.detail.value
      console.log(e.detail,'e.detail')

    },
    search(){
      
      let that = this
      let userCoe = app.globalData.userInfo.userCode
      let userPassWord = this.userPassWord
      console.log(userCoe,'userCoe')
      console.log(userPassWord,'userPassWord')
      this.setData({ loading:true})
      // this.triggerEvent('showResult', {}, {})
      wx.cloud.callFunction({
        // 云函数名称
        name: 'query',
        // 传给云函数的参数
        data: {
          userCode: userCoe,
          userPassWord: userPassWord
        },
        success: function (res) {
          console.log(res.result) // 
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
