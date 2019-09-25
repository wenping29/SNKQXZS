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
      var onOff = this.data.onOff;
      this.setData({ onOff: !onOff });
    },
    modalConfirm() {
    },
    modalCancel() {
    }
  }
})
