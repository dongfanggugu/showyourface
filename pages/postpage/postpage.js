// pages/postpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //产品选择
      brandArray: [
        "雅诗兰黛",
        "cocach",
        "香奈儿" 
      ],
      brandName: '品牌',
      productSrc: '/images/icon_image_default.png',
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

  brandSel: function(e) {
    console.log("sel");
    let index = e.detail.value;
    let pro = this.data.brandArray[index];
    this.setData({
      brandName: pro
    });
  },
  chooseImage: function() {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        _this.setData({
          productSrc: res.tempFilePaths
        });
      }, fail: function() {

      }, complete: function() {

      }
    });
  }
})