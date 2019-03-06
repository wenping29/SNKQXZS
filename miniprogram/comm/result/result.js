// comm/result/result.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource:Array
  },
  // dataSource:[],
  /**
   * 组件的初始数据
   */
  data: {
    searchData:[]
  },
  attached() {
    console.log(this.data.dataSource,'attached() {')
    this.setData({
      searchData: this.data.dataSource
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      this.triggerEvent('back', {}, {})
    }

  }
})
