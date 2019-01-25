// pages/postpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //产品选择
    brandArray: [
      "雅诗兰黛",
      "cocach",
      "香奈儿"
    ],
    brandName: '品牌',
    productSrc: 'https://improxy.starmakerstudios.com/tools/im/200/production/users/5629499487141392/profile.jpg?ts=1548287810',
    skinSrc1: '/images/icon_add_pic.png',
    skinSrc2: '/images/icon_add_pic.png',
    tagArray:[
      { ids: "0", name: '护肤', sel: true },
      { ids: "1", name: '锁水', sel: true },
      { ids: "2", name: '紧致', sel: true },
      { ids: "3", name: '效果明显', sel: true },
      { ids: "4", name: '见效快', sel: false }
    ],
    effectArray:[
      {ids: "0", name: '吃辣', sel: false},
      { ids: "1", name: '牛羊肉', sel: false },
      { ids: "2", name: '运动', sel: false },
      { ids: "3", name: '油炸食品', sel: false },
      { ids: "4", name: '心情愉悦', sel: false },
      { ids: "5", name: '发痒', sel: false },
    ],
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
    var _this = this;
    wx.navigateTo({
      url: '/pages/photocompare/photocompare',
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
  clickEffect: function(e) {
    var index = parseInt(e.currentTarget.id);
    console.log(index);
    var sel = this.data.effectArray[index].sel;
    var selKey = "effectArray[" + index + "].sel";
    this.setData({
      [selKey] : !sel
    }); 
  }
})