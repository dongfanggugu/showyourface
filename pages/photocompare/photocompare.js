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
    leftLabel: "",
    rightLabel: "",
    imageArray: [],
    lableArray: [],
    leftSel:0,
    rightSel:0
  },

  getInterval: function (inputTime) {
    var today = new Date();
    var interval = today.getTime()/1000 - inputTime;

    var days = parseInt(interval / (24 * 3600));
    if (days > 0) {
      return days + "天前";
    } else {
      return "今天";
    }
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

    // var tagLeft = [
    //   {name: '吃辣的'},
    //   {name: "感冒了"},
    //   {name:"心情好"}
    // ];
    // this.setData({
    //   tagLeft: tagLeft,
    //   tagRight: tagLeft
    // });

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

    var left_label = that.getInterval(that.data.imageArray[that.data.leftSel].create_time);
    this.setData({
      leftLabel: left_label
    });

    that.data.tagLeft = [];
    var left_tags = that.data.imageArray[that.data.leftSel].tags;
    for (var i = 0; i < left_tags.length; i++) {
      var tag = {
        id: i,
        name: left_tags[i]
      }
      that.data.tagLeft.push(tag);
    }

    that.setData({
      tagLeft: that.data.tagLeft,
    });

  },

  swiperRightChange: function (e) {
    var that = this;
    that.data.rightSel = (e.detail.current + that.data.imageArray.length - 1) % that.data.imageArray.length;

    var right_label = that.getInterval(that.data.imageArray[that.data.rightSel].create_time);
    this.setData({
      rightLabel: right_label
    });

    that.data.tagRight = [];
    var right_tags = that.data.imageArray[that.data.rightSel].tags;
    for (var i = 0; i < right_tags.length; i++) {
      var tag = {
        id: i,
        name: right_tags[i]
      }
      that.data.tagRight.push(tag);
    }

    that.setData({
      tagRight: that.data.tagRight,
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
        // that.data.lableArray = res.
        console.log(res.data);
        // success
        that.setData({
          imageArray: that.data.imageArray
        });

        that.data.leftSel = 0;
        that.data.rightSel = that.data.imageArray.length - 1;
       
        var left_tags = that.data.imageArray[that.data.leftSel].tags;
        var right_tags = that.data.imageArray[that.data.rightSel].tags;

        for (var i = 0; i < left_tags.length; i++) {
          var tag = {
            id: i,
            name: left_tags[i]
          }
          that.data.tagLeft.push(tag);
        }

        for (var i = 0; i < right_tags.length; i++) {
          var tag = {
            id: i,
            name: right_tags[i]
          }
          that.data.tagRight.push(tag);
        }

      that.setData({
      tagLeft: that.data.tagLeft,
      tagRight: that.data.tagRight
      });

        var left_label = that.getInterval(that.data.imageArray[that.data.leftSel].create_time);
        that.setData({
          leftLabel: left_label
        });

        var right_label = that.getInterval(that.data.imageArray[that.data.rightSel].create_time);
        that.setData({
          rightLabel: right_label
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
  delProduct: function (e) {
    wx.showToast({
      title: "产品删除成功"
    });
  },
  delLeft: function (e) {
    wx.showToast({
      title: "左侧删除成功"
    }); 
  },
  delRight: function (e) {
    wx.showToast({
      title: "右侧删除成功"
    });
  }
})