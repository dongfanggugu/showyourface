const app = getApp();
let baseURL = app.globalData.baseURL;
var utils = require("../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newProTag: '',
    newSkinTag: '',
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
      hideSkinDel: true,
      hiddenProModal: true,
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

  getSelTagCount: function () {
    var amount = 0;
    for (var i = 0; i < this.data.tagArray.length; i++) {
      amount += this.data.tagArray[i].sel ? 1 : 0;
    }
    return amount;
  }, 


  clickTag: function (e) {
    var amount = this.getSelTagCount();
    var index = parseInt(e.currentTarget.id);
   
    console.log(index);
    var sel = this.data.tagArray[index].sel;

    if (amount >= 3 && !sel) {
      wx.showToast({
        title: '最多选三个功效!',
        icon: ''
      });
      return;
    }

    if (index == this.data.tagArray.length - 1) {
      this.setData({
        hiddenProModal: false 
      })
      return;
    }

    this.data.tagArray[index].sel = !sel;
    var selKey = "tagArray[" + index + "].sel";
    this.setData({
      [selKey]: !sel
    });
  },

  getSelEffectCount: function () {
    var amount = 0;
    for (var i = 0; i < this.data.effectArray.length; i++) {
      amount += this.data.effectArray[i].sel ? 1 : 0;
    }
    return amount;
  }, 

  clickEffect: function (e) {
    var amount = this.getSelEffectCount();
    console.log("amount: " + amount);

    var index = parseInt(e.currentTarget.id);
    var sel = this.data.effectArray[index].sel;

    if (amount >= 3 && !sel) {
      wx.showToast({
        title: '最多选三个纪要!',
        icon: ''
      });
      return;
    }

    if (index == this.data.effectArray.length - 1) {
      this.setData({
        hiddenSkinModal: false 
      })
      return;
    }

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
        that.showProTags(res.data.effect_tags);
        that.showSkinTags(res.data.summary_tags);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  showProTags: function (array) {
    for (var i = 0; i < array.length; i++) {
      var name = array[i];
      var tag = { ids: i, name: name, sel: false };
      this.data.tagArray.push(tag);
    }
    var tag = { ids: array.length, name: '++添加标签++', sel: false};
    this.data.tagArray.push(tag);
    this.setData({
      tagArray: this.data.tagArray
    });
  },
  showSkinTags: function (array) {
    for (var i = 0; i < array.length; i++) {
      var name = array[i];
      var tag = { ids: i, name: name, sel: false };
      this.data.effectArray.push(tag);
    }

    var tag = { ids: array.length, name: '++添加标签++', sel: false};
    this.data.effectArray.push(tag);

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
      formData: {
        token: app.globalData.token,
      }, // HTTP 请求中其他额外的 form data
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
  },
  proInput: function (e) {
    var value = e.detail.value;
    var that = this;
    if (value.length > 5) {
      var validValue = value.substr(0, 5);
      this.data.newProTag = validValue;
      this.setData({
          inputProValue: that.data.newProTag
        }
      );
      return;
    }
    this.data.newProTag = e.detail.value;
  },
  proConfirm: function (e) {
    if (this.proTagExist(this.data.newProTag)) {
      wx.showToast({
        title: '产品标签已经存在，请输入新的标签',
        icon: ''
      })
      return;
    }
    var that = this;
    var tag = this.data.tagArray.pop();
    var newTag = {ids: tag.ids, name: this.data.newProTag, sel: true};
    this.data.tagArray.push(newTag);
    tag.ids += 1;
    this.data.tagArray.push(tag);
    this.setData({ 
      hiddenProModal: true,
      tagArray: that.data.tagArray,
      inputProValue: ''
     });
  },
  proCancel: function (e) {
    this.data.newProTag = '';
    var that = this;
    this.setData({ 
      hiddenProModal: true,
      inputProValue: ''
    })
  },
  proTagExist: function (name) {
    for (var i =0; i < this.data.tagArray.length; i++) {
      var tag = this.data.tagArray[i];
      if (tag.name == name) {
        return true;
      }
    }
    return false;
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