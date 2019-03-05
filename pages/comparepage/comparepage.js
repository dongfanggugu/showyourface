// pages/comparepage/comparepage.js
const app = getApp();
let baseURL = app.globalData.baseURL;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showVertical: true,
    imageLeft: "",
    imageRight: "",
    touch: {
      distance: 0,
      scale: 1,
      baseWidth: null,
      baseHeight: null,
      scaleWidth: null,
      scaleHeight: null
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.imageLeft = baseURL + "/static/" + options.left;
    this.data.imageRight = baseURL + "/static/" + options.right;
    console.log(this.data.imageLeft);
    console.log(this.data.imageRight);
    var that = this;
    this.setData({
      imageLeft: that.data.imageLeft,
      imageRight: that.data.imageRight
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
  touchStartHandle(e) {
    // 单手指缩放开始，也不做任何处理 
    if (e.touches.length == 1) {
      console.log("单滑了")
      return
    }
    console.log('双手指触发开始')
    // 注意touchstartCallback 真正代码的开始 
    // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug 
    // 当两根手指放上去的时候，就将distance 初始化。 
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      'touch.distance': distance,
    })
  },
  touchMoveHandle(e) {
    let touch = this.data.touch
    // 单手指缩放我们不做任何操作 
    if (e.touches.length == 1) {
      console.log("单滑了");
      return
    }
    console.log('双手指运动开始')
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    // 新的 ditance 
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    let distanceDiff = distance - touch.distance;
    let newScale = touch.scale + 0.005 * distanceDiff
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是 
    if (newScale >= 2) {
      newScale = 2
    }
    if (newScale <= 0.6) {
      newScale = 0.6
    }
    let scaleWidth = newScale * touch.baseWidth
    let scaleHeight = newScale * touch.baseHeight
    // 赋值 新的 => 旧的 
    this.setData({
      'touch.distance': distance,
      'touch.scale': newScale,
      'touch.scaleWidth': scaleWidth,
      'touch.scaleHeight': scaleHeight,
      'touch.diff': distanceDiff
    })
  },
  load: function (e) {
    // bindload 这个api是<image>组件的api类似<img>的onload属性 
    this.setData({
      'touch.baseWidth': e.detail.width,
      'touch.baseHeight': e.detail.height,
      'touch.scaleWidth': e.detail.width,
      'touch.scaleHeight': e.detail.height
    });
  },
  savePic: function (e) {
    var vertical = this.data.showVertical;
    if (vertical) {
      this.genVerticalImage();
    } else {
      this.genHorizonImage();
    }
  },

  genVerticalImage: function (e) {
    var that = this;
    var ctx = wx.createCanvasContext('drawVertical');
    wx.getImageInfo({
      src: that.data.imageLeft,
      success(res){
        var width = res.width;
        var height = res.height;
        var scale = that.calculateVScale(width, height);
        var newW = width * scale;
        var newH = height * scale;
        var x = (300 - newW) / 2;
        var y = (200 - newH) - 5;
        ctx.drawImage(res.path, x, y, newW, newH);
        ctx.draw()
        wx.getImageInfo({
          src: that.data.imageRight,
          success(res){
            var width = res.width;
            var height = res.height;
            var scale = that.calculateVScale(width, height);
            var newW = width * scale;
            var newH = height * scale;
            var x = (300 - newW) / 2;
            var y = 205;
            ctx.drawImage(res.path, x, y, newW, newH);
            ctx.draw(true, setTimeout(() => {
              wx.canvasToTempFilePath({
                canvasId: 'drawVertical',
                fileType: 'jpg',
                success(res) {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success() {
                          wx.showToast({
                            title: '图片保存成功'
                          });
                          wx.navigateBack({
                            delta: app.globalData.pageDelta, // 回退前 delta(默认为1) 页面
                            success: function(res){
                              // success
                            },
                            fail: function() {
                              // fail
                            },
                            complete: function() {
                              // complete
                            }
                          });
                        }
                      })
                    }
                  })
                }
              }, that)
            }, 1000))
          }
        });
      }
    });
  },
  genHorizonImage: function (e) {
    var that = this;
    var ctx = wx.createCanvasContext('drawHorizon');
    wx.getImageInfo({
      src: that.data.imageLeft,
      success(res){
        var width = res.width;
        var height = res.height;
        var scale = that.calculateHScale(width, height);
        var newW = width * scale;
        var newH = height * scale;
        var x = (200 - newW) - 5;
        var y = (300 - newH) / 2;
        ctx.drawImage(res.path, x, y, newW, newH);
        ctx.draw()
        wx.getImageInfo({
          src: that.data.imageRight,
          success(res){
            var width = res.width;
            var height = res.height;
            var scale = that.calculateHScale(width, height);
            var newW = width * scale;
            var newH = height * scale;
            var x = 205;
            var y = (300 - newH) / 2;
            ctx.drawImage(res.path, x, y, newW, newH);
            ctx.draw(true, setTimeout(() => {
              wx.canvasToTempFilePath({
                canvasId: 'drawHorizon',
                fileType: 'jpg',
                success(res) {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success() {
                          wx.showToast({
                            title: '图片保存成功'
                          });
                          wx.navigateBack({
                            delta: app.globalData.pageDelta, // 回退前 delta(默认为1) 页面
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
                    }
                  })
                }
              }, that)
            }, 1000))
          }
        });
      }
    });
  },
  calculateVScale: function (width, height) {
    if (0 == width || 0 == height) {
      return 1;
    }
    var scaleW = 280 / width;
    var scaleH = 180 / height;
    return Math.min(scaleW, scaleH);
  },
  calculateHScale: function (width, height) {
    if (0 == width || 0 == height) {
      return 1;
    }
    var scaleW = 180 / width;
    var scaleH = 280 / height;
    return Math.min(scaleW, scaleH);
  },
  horizonMode: function (e) {
    this.data.showVertical = false;
    this.setData({
      showVertical: false
    });
  },
  verticalMode: function (e) {
    this.data.showVertical = true;
    this.setData({
      showVertical: true 
    });
  },
  onShareAppMessage: function (e) {
    
    return {
      title: '分享',
      success: function (res) {
        wx.showToast({
          title: '分享成功'
        });
      }
    }
  }
})