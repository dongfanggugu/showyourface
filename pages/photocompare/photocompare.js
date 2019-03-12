// pages/photocompare/photocompare.js
const app = getApp();
let baseURL = app.globalData.baseURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:'',
    productSrc: '',
    tagArray:[],
    tagLeft:[],
    tagRight:[],
    path: baseURL,
    animationChange:"",
    leftLabel: "第1天",
    rightLabel: "第1天",
    imageArray: [],
    leftSel:0,
    rightSel:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var product_id = options.product_id;
    this.getRecordInfo(app.globalData.token, product_id);
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
    this.data.tagArray = [];
    var product = app.globalData.appendProduct;
    this.data.product = product;
    for (var i = 0; i < product.product_tags.length; i++) {
      var tag = {
        id: i,
        name: product.product_tags[i]
      }
      this.data.tagArray.push(tag);
    }
    console.log(this.data.tagArray);
    var that = this;
    this.setData({
      productSrc: baseURL + "/static/" + product.product_image,
      productName: product.product_name,
      tagArray: that.data.tagArray
    });

    var tagLeft = [
      {name: '吃辣的'},
      {name: "感冒了"},
      {name:"心情好"}
    ];
    this.setData({
      tagLeft: tagLeft,
      tagRight: tagLeft
    });

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
    var that = this;
    that.data.leftSel = e.detail.current;
    this.setData({
      leftLabel: '第' + (that.data.leftSel + 1) + '天'
    });
  },
  swiperRightChange: function (e) {
    var that = this;
    that.data.rightSel = e.detail.current;
    this.setData({
      rightLabel: '第' + (that.data.rightSel  + 1) + '天'
    });
  },
  comparePic: function(e) {
    var that = this;
    var left = that.data.imageArray[that.data.leftSel].image;
    var right = that.data.imageArray[that.data.rightSel].image;
    wx.navigateTo({
      url: '/pages/comparepage/comparepage?left=' + left + "&right=" + right,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getRecordInfo: function (token, product_id) {
    var that = this;
    wx.request({
      url: baseURL + "/get_compare_pics",
      data: {
        token: token,
        product_id: product_id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log(res);
        that.data.imageArray = res.data;
        console.log(res.data);
        // success
        that.setData({
          imageArray: that.data.imageArray
        });

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