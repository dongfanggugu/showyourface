const app = getApp();
let baseURL = app.globalData.baseURL;
var utils = require("../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName: '',
    productSrc: '/images/icon_add_pic.png',
    productURL: "",
    skinSrc1: '/images/icon_add_pic.png',
    skinSrc1URL: '',
    skinSrc2: '/images/icon_add_pic.png',
    skinSrc2URL: '',
    tagArray: [],
    effectArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotTags();
    this.setData({
      hideImgDel: true,
      hideSkinDel: true
    });
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
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.productSrc = res.tempFilePaths[0];
        that.setData({
          productSrc: that.productSrc,
          hideImgDel: false
        });
        that.uploadImage(that.productSrc, 'product');

      }, fail: function() {

      }, complete: function() {

      }
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
          skinSrc1: that.data.skinSrc1,
          hideSkinDel: false
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
  inputProductName: function (e) {
    this.data.productName = e.detail.value;
  },
  completePost: function(e) {
    if (utils.emptyStr(this.data.productName)) {
      wx.showToast({
        title: '请填写产品名称',
        icon: ""
      })
      return;
    }

    if (utils.emptyStr(this.data.productURL)) {
      wx.showToast({
        title: '请添加产品图片',
        icon: ""
      })
      return; 
    }

    if (utils.emptyStr(this.data.skinSrc1URL)) {
      wx.showToast({
        title: '请添加皮肤照片',
        icon: ""
      })
      return;
    }
    
    var that = this;
    //获取选中的产品标签
    var proTags = [];
    for (var i = 0; i < this.data.tagArray.length; i++) {
      var sel = this.data.tagArray[i].sel;
      if (sel) {
        proTags.push(this.data.tagArray[i].name);
      }
    }

    if (0 == proTags.length) {
      wx.showToast({
        title: '请选择产品标签',
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

    console.log("product name:" + this.data.productName);
    console.log("product:" + proTags);
    console.log("skin:" + skinTags);
    console.log("product url:" + this.data.productURL);
    console.log("skin url1:" + this.data.skinSrc1URL);
    console.log("skin url2:" + this.data.skinSrc2URL);
    app.globalData.pageDelta = 3;
    wx.request({
      url: baseURL + "/upload_product_record",
      data: {
        token: app.globalData.token,
        product_name: that.data.productName,
        product_image: that.data.productURL,
        product_tags:proTags,
        skin_images:[that.data.skinSrc1URL],
        summary_tags: skinTags
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res);
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
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
        // wx.navigateTo({
        //   url: '/pages/photocompare/photocompare?product_id=' + res.data.product_record_id,
        //   success: function (res) {
        //     // success
        //   },
        //   fail: function () {
        //     // fail
        //   },
        //   complete: function () {
        //     // complete
        //   }
        // })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  clickTag: function (e) {
    var index = parseInt(e.currentTarget.id);
    console.log(index);
    var sel = this.data.tagArray[index].sel;
    this.data.tagArray[index].sel = !sel;
    var selKey = "tagArray[" + index + "].sel";
    this.setData({
      [selKey]: !sel
    });
  },
  clickEffect: function (e) {
    var index = parseInt(e.currentTarget.id);
    var sel = this.data.effectArray[index].sel;
    this.data.effectArray[index].sel = !sel;
    var selKey = "effectArray[" + index + "].sel";
    this.setData({
      [selKey]: !sel
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
        that.showEffectTags(res.data.effect_tags);
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
  showEffectTags: function (array) {
    for (var i = 0; i < array.length; i++) {
      var name = array[i];
      var tag = { ids: i, name: name, sel: false };
      this.data.tagArray.push(tag);
    }
    this.setData({
      tagArray: this.data.tagArray
    });
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
  },
  delProImg: function (e) {
    var that = this;
    this.data.productSrc = "/images/icon_add_pic.png";
    this.setData({
      productSrc: that.data.productSrc,
      hideImgDel: true 
    }); 
  },
  delSkinImg: function (e) {
    var that = this;
    this.data.skinSrc1 = "/images/icon_add_pic.png";
    this.setData({
      skinSrc1: that.data.skinSrc1,
      hideSkinDel: true
    });
  }
})