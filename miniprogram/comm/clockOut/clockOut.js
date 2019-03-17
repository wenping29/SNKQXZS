// pages/clockOut/clockOut.js
const app = getApp()
let endDate = new Date().format('yyyy-MM-dd')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userCode:String
  },
  attached() {
    // console.log(this.userInfo)
    this.setData({ userInfo: app.globalData.userInfo })
    this.setData({ userCode: app.globalData.userInfo.userCode })
    let datestr = new Date().format('yyyy-MM-dd')
    this.userCode = app.globalData.userInfo.userCode
    this.date = datestr

    this.setData({ date: datestr })
    datestr = new Date().format('hh:mm')
    this.setData({ time: datestr })
    this.time = datestr
  },
  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
    closeTimeText: '打开下班',
    closeTimeEnable: false,
    userInfo: app.globalData.userInfo,
    userCode: '',
    endDate: endDate,
    date: '',
    overTime: false,
    time: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search() {
      this.triggerEvent('search', {}, {})
    },
    bindTimeChange(e) {
      this.setData({ time: e.detail.value })
      this.time = e.detail.value
      console.log(this.date)
    },
    bindDateChange(e) {
      this.setData({ date: e.detail.value })
      this.date = e.detail.value
      console.log(this.date)
    },
    closeTime() {
      const openid = app.globalData.userInfo.openid
      console.log({
        userCode: this.userCode,
        date: this.date,
        time: this.time,
        openid: openid
      })
      let that = this
      console.log({
        userCode: that.userCode,
        date: that.date,
        overTime: that.data.overTime,
        time: that.time,
        openid: openid
      })
      that.setData({ loading: true, closeTimeText: "完成打开" })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'edit',
        // 传给云函数的参数
        data: {
          userCode: that.userCode,
          date: that.date,
          overTime: that.data.overTime,
          time: that.time,
          openid: openid
        },
        success: function (res) {
          console.log(res.result) // 3
          if (res.result.errMsg === "collection.add:ok") {
            console.log('success,success')
            // app.globalData.userInfo.userCode = that.userCode
            // that.triggerEvent('login', res.result.data, {})
            wx.showToast('打开成功')
            that.setData({ loading: false, closeTimeText: "完成打开", closeTimeEnable: false })
          } else {
            console.log('failure,failure')
            that.setData({ loading: false, closeTimeText: "完成打开", closeTimeEnable: false })
            wx.showToast({
              title: res.result.msg,
              icon: 'loading',
              duration: 2000})

          }
        },
        fail: console.error
      })
    },
    overTimeChange(e) {
      console.log(e)
      this.setData({ overTime: e.detail.value })
    }
  }
})
