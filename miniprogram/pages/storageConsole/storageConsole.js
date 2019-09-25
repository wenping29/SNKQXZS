const app = getApp()
Page({
  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },
  onLoad: function (options) {
    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData
    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })
  },

})