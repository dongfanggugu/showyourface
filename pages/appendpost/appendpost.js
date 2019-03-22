
const app = getApp();
let baseURL = app.globalData.baseURL;
var utils = require("../../utils/utils.js")

// pages/postpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newSkinTag: '',
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
    this.setData({
      hideSkinDel: true,
      hiddenSkinModal: true
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

  getInterval: function (inputTime) {
    var today = new Date();
    var now = today.getTime();    
    var today_start = now - (now + 8 * 3600 * 1000) % (24 * 3600 * 1000);
    if (inputTime >= today_start){
      return true;
    }
    else{
      return false;
    }
  },

  completePost: function () {
    console.log(this.data.product.update_time);
    var that = this;
    // if (that.getInterval(this.data.product.update_time * 1000)){
    //   wx.showToast({
    //     title: '今天已添加过哦',
    //     // icon: "",
    //     image: '/images/icon_exclamation.png',
    //   })
    //   return;
    // }

    if (utils.emptyStr(this.data.skinSrc1URL)) {
      wx.showToast({
        title: '请添加皮肤照片',
        icon: "",
        image: '/images/icon_exclamation.png',
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
        icon: "",
        image: '/images/icon_exclamation.png',
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
 
    var index = parseInt(e.currentTarget.id);
    var sel = this.data.effectArray[index].sel;
    //选择新的标签，不大于3个
    if (!sel) {
      var amount = this.getSelEffectCount();
      if (amount >= 3) {
        wx.showToast({
          title: '最多选三个纪要!',
          icon: '',
          image: '/images/icon_exclamation.png',
        });
        return;
      }
    }

    if (index == this.data.effectArray.length - 1) {
      this.setData({
        hiddenSkinModal: false 
      })
      return;
    }

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
    var tag = { ids: array.length, name: '+添加标签', sel: false};
    this.data.effectArray.push(tag);
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
  delSkinImg: function (e) {
    var that = this;
    this.data.skinSrc1 = "/images/icon_add_pic.png";
    this.setData({
      skinSrc1: that.data.skinSrc1,
      hideSkinDel: true
    });
  },
  skinTagExist: function (name) {
    for (var i =0; i < this.data.effectArray.length; i++) {
      var tag = this.data.effectArray[i];
      if (tag.name == name) {
        return true;
      }
    }
    return false;
  },
  skinInput: function (e) {
    var value = e.detail.value;
    var that = this;
    if (value.length > 5) {
      var validValue = value.substr(0, 5);
      this.data.newSkinTag = validValue;
      this.setData({
          inputSkinValue: that.data.newSkinTag
        }
      );
      return;
    }
    this.data.newSkinTag = e.detail.value;
  },
  skinConfirm: function (e) {
    if (this.skinTagExist(this.data.newSkinTag)) {
      wx.showToast({
        title: '纪要标签已经存在，请输入新的标签',
        icon: ''
      })
      return;
    }
    var that = this;
    var tag = this.data.effectArray.pop();
    var newTag = {ids: tag.ids, name: this.data.newSkinTag, sel: true};
    this.data.effectArray.push(newTag);
    tag.ids += 1;
    this.data.effectArray.push(tag);
    this.setData({ 
      hiddenSkinModal: true,
      effectArray: that.data.effectArray,
      inputSkinValue: ''
     });
  },
  skinCancel: function (e) {
    this.data.newSkinTag = '';
    var that = this;
    this.setData({ 
      hiddenSkinModal: true,
      inputSkinValue: ''
    })
  }
})