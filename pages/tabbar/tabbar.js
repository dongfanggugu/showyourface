// pages/tabbar/tabbar.js
const app = getApp();
const baseURL = 'http://www.skinrec.com:33333';
// var AppId = "wxd1fa6ab7d81d10e7";
// var AppSecret = "d59db949fd967bff0e30b73480edd71e";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: baseURL,
    tabItem: "发布",
    first: true,
    second:false,
    third: false,

    itemArray: [
      { "name": "日记", image: "/images/tab_add_sel.png", image_width: '40rpx', text_height: '25rpx', text_color:'rgb(255,109,138)'},
      { "name": "", image: "/images/tab_add.png", image_width: '75rpx', text_height: '0rpx', text_color: '#333333'},
      { "name": "我的", image: "/images/tab_person_nor.png", image_width: '40rpx', text_height: '25rpx', text_color: 'rgb(177,177,177)'}
    ],
    array: [
      // {id: "a12", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a11", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a10", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a9", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a8", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a7", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a6", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a5", info: '产品名称', unique: 'unique_5', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a4", info: '产品名称', unique: 'unique_4', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a3", info: '产品名称', unique: 'unique_3', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a2", info: '产品名称', unique: 'unique_2', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a1", info: '产品名称', unique: 'unique_1', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
      // {id: "a0", info: '产品名称', unique: 'unique_0', url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg"},
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

     //个人页
     motto: 'Hello World',
     userInfo: {},
     hasUserInfo: false,
     canIUse: wx.canIUse('button.open-type.getUserInfo'),
     recordInfo: [
      {
       first: "/images/icon_image_default.png",
       last: "/images/icon_image_default.png",
       product: "产品名称"
      },
      {
        first: "/images/icon_image_default.png",
        last: "/images/icon_image_default.png",
        product: "产品名称"
       },
       {
        first: "/images/icon_image_default.png",
        last: "/images/icon_image_default.png",
        product: "产品名称"
       },
       {
        first: "/images/icon_image_default.png",
        last: "/images/icon_image_default.png",
        product: "产品名称"
       },
       {
        first: "/images/icon_image_default.png",
        last: "/images/icon_image_default.png",
        product: "产品名称"
       },
       {
        first: "/images/icon_image_default.png",
        last: "/images/icon_image_default.png",
        product: "产品名称"
       },
       {
        first: "/images/icon_image_default.png",
        last: "/images/icon_image_default.png",
        product: "产品名称"
       }
    ],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  tapItem: function (e) {
    var index = e.currentTarget.dataset.id;
    var that = this;
    switch (index) {
      //选中 0
      case 0:
        
        this.setData({
          first: true,
          second: false,
          third: false,
          'itemArray[0].image' : '/images/tab_add_sel.png',
          'itemArray[0].text_color': 'rgb(255,109,138)',
          'itemArray[2].image': '/images/tab_person_nor.png',
          'itemArray[2].text_color': 'rgb(177,177,177)'
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
          third: true,
          'itemArray[0].image': '/images/tab_add_nor.png',
          'itemArray[0].text_color': 'rgb(177,177,177)',
          'itemArray[2].image': '/images/tab_person_sel.png',
          'itemArray[2].text_color': 'rgb(255,109,138)'
        });
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //login
    this.initToken();
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

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
  },
  addRecord: function() {
    wx.navigateTo({
      // url: '/pages/postpage/postpage',
      url: '/pages/appendpost/appendpost',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  initToken: function () {
    var that = this;
    wx.getStorage({
      key: 'remote_token',
      success: function(res){
        // success
        app.globalData.token = res.data;
        console.log("token:" + res.data);
        that.getServerInfo();
      },
      fail: function() {
        // fail
        that.wxLogin();
      },
      complete: function() {
        // complete
      }
    })
  }
  ,
  wxLogin: function() {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          var code = res.code;
          wx.request({
            url: baseURL + "/login",
            data: {
              code: code
            },
            header:{
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              console.log(res);
              app.globalData.token = res.data.token;
              that.getServerInfo();
              wx.setStorage({
                key: 'remote_token',
                data: res.data.token,
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
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getServerInfo: function () {
    var token = app.globalData.token;
    this.getRecordInfo(token)
  },
  getTotoalInfo: function (token) {
    var that = this;
    wx.request({
      url: baseURL + "/user_record?",
      data: {
        token: token
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        picCount = parseInt(res['pic_count']);
        dayCount = parseInt(res['day_count']);
        productCount = parseInt(res['product_count']);
        lastRecord = parseInt(res['last_record_time']);
        that.setData({
          totalNumber: picCount,
          continuedDays: dayCount,
          totalProduct: productCount,
          lastDay:lastRecord
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getRecordInfo: function (token) {
    var that = this;
    wx.request({
      url: baseURL + "/user_record_list",
      data: {
        token: token
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.data.array = res.data;
        for (var i = 0; i < that.data.array.length; i++) {
          var seconds = that.data.array[i].create_time;
          that.data.array[i].createTime = that.formatDateTime(seconds * 1000);
        }
        
        that.setData({
          array: that.data.array
        });

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  formatDateTime: function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y+'-'+m+'-'+d+' '+' '+h+':'+minute+':'+second;
  }
})