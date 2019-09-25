const app = getApp();
let endDate = new Date().format('yyyy-MM-dd');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  onLoad: function () {
  },
  onShow: function () {

  },
  attached() {
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
    },
    bindDateChange(e) {
      this.setData({ date: e.detail.value })
      this.date = e.detail.value
    },
    closeTime() {
      const openid = app.globalData.userInfo.openid
      let that = this
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
          if (res.result.errMsg === "collection.add:ok") {
            wx.showToast('打开成功')
            that.setData({ loading: false, closeTimeText: "完成打开", closeTimeEnable: false })
          } else {
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
      this.setData({ overTime: e.detail.value })
    }
  }
})
