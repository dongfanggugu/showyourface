// pages/tabbar/tabbar.js
const app = getApp();
let baseURL = app.globalData.baseURL;
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
    array: [],
    url: "https://improxy.starmakerstudios.com/tools/im/0/files/6192448705691759/e1d952c2ea2e046adda99cee1c94ca90.jpg",

    //轮播页数据
    imgUrls: [],
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
     canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  getUserInfo: function(e) {
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
    this.getServerInfo();
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
    });
  },
  initToken: function () {
    console.log("init token");
    var that = this;
    that.wxLogin();
    // wx.getStorage({
    //   key: 'remote_token',
    //   success: function(res){
    //     // success
    //     app.globalData.token = res.data;
    //     console.log("local token:" + res.data);
    //     that.getServerInfo();
    //   },
    //   fail: function() {
    //     console.log("wxlogin failed");
    //     // fail
    //     that.wxLogin();
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
  },
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
              console.log("remote token:" + res.data.token);
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
              console.log("wxlogin failed");
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
    if(typeof token == "undefined" || token == null || token == ""){
      return;
    }
    this.getLoopPicture(token);
    this.getRecordInfo(token);
    this.getTotoalInfo(token);
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
        console.log(res);
        var picCount = parseInt(res.data.pic_num);
        var dayCount = parseInt(res.data.day_count);
        var productCount = parseInt(res.data.product_count);
        var lastCreateTime = parseInt(res['last_record_time']);
        var lastRecord = "上次记录" + that.getInterval(lastCreateTime * 1000);
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
          that.data.array[i].createTime = that.getInterval(seconds * 1000);
        }
        var moreData = {};
        that.data.array.push(moreData);
        
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
  getInterval: function (inputTime) {
    var today = new Date();
    var interval = today.getTime() - inputTime;
    console.log(interval);
    if (interval <= 0) {
      return "刚刚";
    }
    var days = parseInt(interval / (24 * 3600 * 1000));
    if (days > 0) {
      return days + "天前";
    } else {
      var hours = parseInt(interval / (3600 * 1000));
      if (hours > 1) {
        return hours + "小时前";
      } else {
        var minutes = parseInt(interval / (60 * 1000));
        if (minutes > 1) {
          return minutes = "分钟前";
        } else {
          return "刚刚";
        }
      }
    }
  },
  getLoopPicture: function (token) {
    var that = this;
    wx.request({
      url: baseURL + "/loop_picture",
      data: {
        token: token
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.data.imgUrls = [];
        for (var i = 0; i < res.data.length; i++) {
          that.data.imgUrls.push(baseURL + "/static/images/banner/" + res.data[i].image);
        }
        that.setData({
          imgUrls: that.data.imgUrls
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
  appendRecord: function (e) {
    var index = e.currentTarget.id;
    if (index >= this.data.array.length) {
        return;
    }
    var product = this.data.array[index];
    app.globalData.appendProduct = product;
    wx.navigateTo({
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
  compareRecord: function (e) {
    var index = e.currentTarget.id;
    console.log(index);
    if (index >= this.data.array.length) {
      return;
    }
    var productId = this.data.array[index].product_id;
    app.globalData.pageDelta = 2;
    wx.navigateTo({
      url: '/pages/photocompare/photocompare?product_id=' + productId,
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