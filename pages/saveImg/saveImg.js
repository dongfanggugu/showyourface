// pages/saveImg/saveImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  saveImageToLocal: function (){
    console.log("save image to local")
  
    wx.saveImageToPhotosAlbum({
      filePath: './testSave.jpeg',
      success(res) {
        wx.showToast({
          title: '保存图片成功',
        })
      },
      fail(res) {
        console.log("fail" + res.data)
        wx.showToast({
          title: '保存图片失败',
        })
      }
    })

    console.log("save image to local finished")
  },

  share: function (){
    console.log(" share image")
  }
})