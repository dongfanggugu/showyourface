
const app = getApp();
let baseURL = app.globalData.baseURL;
var utils = require("../../utils/utils.js")

// pages/postpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:'',
    productSrc: '',
    skinSrc1: '/images/icon_add_pic.png',
    skinSrc2: '/images/icon_add_pic.png',
    skinSrc1URL: '',
    skinSrc2URL: '',
    tagArray:[],
    effectArray:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotTags();
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

  brandSel: function (e) {
    console.log("sel");
    let index = e.detail.value;
    let pro = this.data.brandArray[index];
    this.setData({
      brandName: pro
    });
  },
  chooseImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          productSrc: res.tempFilePaths
        });
      }, fail: function () {

      }, complete: function () {

      }
    });
  },
  chooseSkinImage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          skinSrc: res.tempFilePaths
        });
      }, fail: function () {

      }, complete: function () {

      }
    });
  },
  completePost: function () {
    var that = this;

    if (utils.emptyStr(this.data.skinSrc1URL)) {
      wx.showToast({
        title: '请添加皮肤照片',
        icon: ""
      })
      return;
    }
   
    //获取选中的皮肤标签
    var skinTags = [];
    for (var i = 0; i < this.data.effectArray.length; i++) {
      var sel = this.data.effectArray[i].sel;
      if (sel) {
        skinTags.push(this.data.effectArray[i].name);
      }
    }
    
    if (0 == skinTags.length) {
      wx.showToast({
        title: '请选择日记标签',
        icon: ""
      })
      return; 
    }

    console.log("skin:" + skinTags);
    console.log("skin url1:" + this.data.skinSrc1URL);
    console.log("skin url2:" + this.data.skinSrc2URL);
    app.globalData.pageDelta = 3;
    wx.request({
      url: baseURL + "/upload_skin_record",
      data: {
        token: app.globalData.token,
        product_record_id: that.data.product.product_id,
        skin_images:[that.data.skinSrc1URL],
        summary_tags: skinTags
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res);
        wx.navigateTo({
          url: '/pages/photocompare/photocompare?product_id=' + that.data.product.product_id,
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
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getSelEffectCount: function () {
    var amount = 0;
    for (var i = 0; i < this.data.effectArray.length; i++) {
      amount += this.data.effectArray[i].sel ? 1 : 0;
    }
    return amount;
  } 
  ,
  clickEffect: function(e) {
    var amount = this.getSelEffectCount();
    console.log("amount: " + amount);
    if (amount >= 3) {
      wx.showToast({
        title: '最多选择三个纪要!',
        icon: ''
      });
      return;
    }
    var index = parseInt(e.currentTarget.id);
    console.log(index);
    var sel = this.data.effectArray[index].sel;
    var selKey = "effectArray[" + index + "].sel";
    this.setData({
      [selKey] : !sel
    }); 
  },
  getHotTags: function (e) {
    console.log("token:" + app.globalData.token);
    var that = this;
    wx.request({
      url: baseURL + "/get_hot_tags",
      data: {
        token: app.globalData.token
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.showSummaryTags(res.data.summary_tags);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  showSummaryTags: function (array) {
    for (var i = 0; i < array.length; i++) {
      var name = array[i];
      var tag = { ids: i, name: name, sel: false };
      this.data.effectArray.push(tag);
    }
    this.setData({
      effectArray: this.data.effectArray
    });
  },
  chooseSkinImage1: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.data.skinSrc1 = res.tempFilePaths[0];
        that.setData({
          skinSrc1: that.data.skinSrc1
        });
        that.uploadImage(that.data.skinSrc1, 'face1');
      }, fail: function() {

      }, complete: function() {

      }
    }); 
  },
  chooseSkinImage2: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.data.skinSrc2 = res.tempFilePaths[0];
        that.setData({
          skinSrc2: that.data.skinSrc2
        });
        that.uploadImage(that.data.skinSrc2, 'face2');
      }, fail: function () {

      }, complete: function () {

      }
    }); 
  },
  uploadImage: function (path, imageType) {
    var that = this;
    var uploadURL = baseURL + '/image/upload?name=' + imageType;
    wx.uploadFile({
      url: uploadURL,
      filePath: path,
      name: imageType,
      formData: {
        token: app.globalData.token
      },
      // header: {}, // 设置请求的 header
      // formData: {}, // HTTP 请求中其他额外的 form data
      success: function (res) {
        // success
        console.log(res);
        var dataStr = res.data;
        var dataJSON = JSON.parse(dataStr);
        var url = dataJSON.url;
        if (imageType == 'product') {
          that.data.productURL = url;
        } else if (imageType == 'face1') {
          that.data.skinSrc1URL = url;
        } else if (imageType == 'face2') {
          that.data.skinSrc2URL = url;
        }
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