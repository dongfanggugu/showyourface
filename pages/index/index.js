//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getCarInfo: function() {
    var that = this;
    wx.request({
      url: 'https://www.showyourface.com/cars',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var cars = res.data[0].desc;
        that.setData({
          mycar: cars
        })
      }
    })
  },

  goLogin: function () {
    wx.login({
      success(res) {
        if (res.code) {
          console.log('code:' + res.code)
          // 发起网络请求
          wx.request({
            url: 'http://www.skinrec.com:33333',
            data: {
              code: res.code
            },
            header: {
              "content-type": "application/json"
            },
            method: 'GET',
            success: function (res) {
              console.log(res)
              wx.setStorage({
                //后面写完再回来改
                key: "thirdSession",
                data: res.data,
              })
            },
            fail: function (res) {
              console.log(res);
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  getUserInfoOld: function () {
    //this.getCarInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  bindGetUserInfo: function (e) {
    var that = this;
    console.log(e.detail.userInfo);
  },

  onLoad: function () {
    //this.getCarInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  goNextPage: function() {
    wx.navigateTo({
      url: '/pages/tabbar/tabbar'
    });
  },
  goMy: function() {
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },
  goSaveImg: function () {
    wx.navigateTo({
      url: '/pages/saveImg/saveImg',
    })
  }
})
