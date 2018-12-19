// pages/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {id: 5, unique: 'unique_5', url: "http://t1.mmonly.cc/uploads/allimg/tuku/1613554605-0.jpg"},
      {id: 4, unique: 'unique_4', url: "http://t1.mmonly.cc/uploads/allimg/tuku/1613554605-0.jpg"},
      {id: 3, unique: 'unique_3', url: "http://t1.mmonly.cc/uploads/allimg/tuku/1613554605-0.jpg"},
      {id: 2, unique: 'unique_2', url: "http://t1.mmonly.cc/uploads/allimg/tuku/1613554605-0.jpg"},
      {id: 1, unique: 'unique_1', url: "http://t1.mmonly.cc/uploads/allimg/tuku/1613554605-0.jpg"},
      {id: 0, unique: 'unique_0', url: "http://t1.mmonly.cc/uploads/allimg/tuku/1613554605-0.jpg"},
    ],
    numberArray: [1, 2, 3, 4],
    url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBar({});
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
  chooseImage: function() {
    var _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        _this.setData({
          src: res.tempFilePaths
        });
      },
      fail: function() {

      },
      complete: function() {

      }
    });
  }
})