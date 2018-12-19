// pages/tabbar/tabbar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabItem: "发布",
    first: true,
    second:false,
    third: false,

    itemArray: [
      {"name": "日记", image: "/images/icon_tab_1.png"},
      {"name": "", image: "/images/icon_main_add.png"},
      {"name": "我的", image: "/images/icon_tab_1.png"}
    ],
    array: [
      {id: "a12", unique: 'unique_5'},
      {id: "a11", unique: 'unique_5'},
      {id: "a10", unique: 'unique_5'},
      {id: "a9", unique: 'unique_5'},
      {id: "a8", unique: 'unique_5'},
      {id: "a7", unique: 'unique_5'},
      {id: "a6", unique: 'unique_5'},
      {id: "a5", unique: 'unique_5'},
      {id: "a4", unique: 'unique_4'},
      {id: "a3", unique: 'unique_3'},
      {id: "a2", unique: 'unique_2'},
      {id: "a1", unique: 'unique_1'},
      {id: "a0", unique: 'unique_0'},
    ],
    url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg",

    //轮播页数据
    imgUrls: [
      'https://improxy.starmakerstudios.com/tools/im/200/production/users/6755399448702845/profile.jpg/ts1542811614',
      'https://improxy.starmakerstudios.com/tools/im/120x/files/3639608919/cover_0efde37fd5188316c02267353d6e14cf.jpg',
      'https://improxy.starmakerstudios.com/tools/im/200/production/cover_img/6583d91e626a15d4ca4fe3b0632ca845.jpg'
  ],
    //是否显示指适点
    indicatorDots: true,
    //是否轮播
    autoplay: true,
    interval: 5000,
    duration: 1000,
    inputShowed: false,
    inputVal: "",
    //轮播页当前index
    swiperCurrent: 0,

    //详细信息
    totalNumber: 34,
    continuedDays: 23,
    totalProduct: 4,
    lastDay: 2,
  },

  tapItem: function (e) {
    var index = e.currentTarget.dataset.id;
    switch (index) {
      case 0:
        this.setData({
          first: true,
          second: false,
          third: false
        });
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/postpage/postpage',
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })

        break;
      case 2:
        this.setData({
          first: false,
          second: false,
          third: true
        });
        break;
    }
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
  //轮播图的切换事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播图点击事件
  swipclick: function (e) {
    console.log(this.data.swiperCurrent)
  }
})