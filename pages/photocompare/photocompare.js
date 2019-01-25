// pages/photocompare/photocompare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationChange:"",
    leftLabel: "第1天",
    rightLabel: "第2天",
    imageArray: [
      {
        src: 'https://improxy.starmakerstudios.com/tools/im/200/production/users/6755399448702845/profile.jpg/ts1542811614',
        selected: false,
        marginLeft: 0,
        width: 120
      },

      {
        src: 'https://improxy.starmakerstudios.com/tools/im/200/production/users/6755399379224130/profile.jpg?ts=1538651568',
        selected: false,
        marginLeft: 0,
        width: 120
      },
      {
        src: 'https://improxy.starmakerstudios.com/tools/im/800x/production/promotion/banner/75f4c356df8c9f45d3202a7d56594d1c.jpg',
        selected: false,
        marginLeft: 0,
        width: 120
      },
      {
        src: 'https://improxy.starmakerstudios.com/tools/im/560/production/uploading/recordings/6755399294391976/cover_image_best.jpg/ts1538060272',
        selected: false,
        marginLeft: 0,
        width: 120
      },
      {
        src: 'https://improxy.starmakerstudios.com/tools/im/200/production/users/6755399377822167/profile.jpg?ts=1548079926',
        selected: false,
        marginLeft: 0,
        width: 120
      },
      {
        src: 'https://improxy.starmakerstudios.com/tools/im/200/production/users/5629499487141392/profile.jpg?ts=1548287810',
        selected: false,
        marginLeft: 0,
        width: 120
      },
      {
        src: 'https://improxy.starmakerstudios.com/tools/im/200/production/users/5910973793541840/profile.jpg?ts=1545226387',
        selected: false,
        marginLeft: 0,
        width: 120
      }
    ],
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
  swiperLeftChange: function (e) {
    var current = e.detail.current;
    this.setData({
      leftLabel: '第' + (current + 1) + '天'
    });
  },
  swiperRightChange: function (e) {
    var current = e.detail.current;
    this.setData({
      rightLabel: '第' + (current + 1) + '天'
    });
  },
  comparePic: function(e) {
    var _this = this;
    wx.navigateTo({
      url: '/pages/comparepage/comparepage',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})