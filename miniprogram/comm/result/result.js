const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource:Array,
    avgDate:String
  },
  /**
   * 组件的初始数据
   */
  data: {
    searchData:[],
    onOff: true
  },
  attached() {
    this.setData({
      searchData: this.data.dataSource
    })
    let dayCount = 0
    let dateList = this.data.dataSource.map(v=>{
      let longtime  = 0
      if (v.overTime && v.overTime) {
       longtime = 6*60*60*1000 + new Date(v.date + " " + v.time).getTime() - new Date(v.date + " 00:00:00").getTime()
        dayCount = dayCount + 2
      } else {
       longtime = new Date(v.date + " " + v.time).getTime() - new Date(v.date + " 18:00:00").getTime()
        dayCount = dayCount + 1
      }
      return longtime
    })
    let avgSum = 0 
    if (dateList){
      dateList.map(v=>{
        avgSum = avgSum + v
      })
      avgSum = avgSum / dayCount
    }
    if (avgSum ) {
      this.setData({
        avgDate: this.formatDuring(avgSum)
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      this.triggerEvent('back', {}, {})
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((mss % (1000 * 60)) / 1000) ;
      return  hours + " 时 " + minutes + " 分 " + seconds + " 秒 ";
    },
    operate(data) {
      // var onOff = this.data.onOff;
      // this.setData({ onOff: !onOff });
      let that = this
      wx.showModal({
        title: '提示',
        content: '确认删除？',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定', res, data)
            that.deleteRec(data.target.dataset.item._id)
          }else{
              // console.log('用户点击取消')
          }
        }
      })
    },
    deleteRec(recId) {
      let that = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'deleteRec',
        // 传给云函数的参数
        data: {
          userCode: app.globalData.userInfo.userCode,
          id: recId
        },
        success: function (res) {
          console.log('sucess', res)
          wx.showToast({
            title: '删除数据成功',
            icon: 'loading',
            duration: 2000
          })
          that.setData({
            searchData: that.data.dataSource.filter(v => v._id != recId)
          })
        },
        fail: console.error
      })
    },
    modalConfirm() {
      // wx.showModal(OBJECT) 
    },
    modalCancel() {
    }
  }
})
