// pages/index/index.js

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput:'',
    // 轮播图数据
    autoplay: true,
    interval: 3000,
    duration: 1000,
    banners: [],
    // 商品类型数据
    categories: [],
    activeCategoryId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBannersData();
    this.getTabTypeData();
    this.getNoticeListData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 监听输入框数据
   */
  listenerSearchInput: (e) => {
    console.log(e.detail.value)
    this.setData({
      searchInput: e.detail.value
    })
  },
  /**
   * 搜索
   */
  toSearch: function() {
    // 显示 loading 提示框 需主动调用 wx.hideLoading 才能关闭提示框
    // wx.showLoading({
    //   title:'加载中',
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)

    // 显示模态弹窗
    wx.showModal({
      title: '提示',
      content: "是否进行该操作？",
      success: function(e) {
        console.log(e)
        if (e.confirm){
         // 显示消息提示框
          wx.showToast({
            title: '确认成功',
            icon: 'success',
            duration: 1500,
            mask: false
          })
        }else{
          wx.showToast({
            title: '取消确认',
            icon: 'loading',
            duration: 1500,
            mask: false
          })
        }
      },
    })

    // ​显示操作菜单
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })

  },
  /**
   * 商品类型项高亮
   */
  tabClick: function(e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.getGoodsList(e.currentTarget.id);
  },
  /**
   * 获取轮播图数据
   */
  getBannersData: function() {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/banner/list',
      data: {
        key: 'mallName'
      },
      success: function(res) {
        if (res.data.code == 404) {
          wx.showModal({
            title: '提示',
            content: '请在后台添加 banner 轮播图片',
            showCancel: false
          })
        } else {
          that.setData({
            banners: res.data.data
          });
        }
      }
    })
  },
  /**
   *获取tab类型数据
   */
  getTabTypeData: function() {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
      success: function(res) {
        var categories = [{
          id: 0,
          name: "全部"
        }];
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            categories.push(res.data.data[i]);
          }
        }
        that.setData({
          categories: categories,
          activeCategoryId: 0
        });
        that.getGoodsList(0);
      }
    })
  },
  /**
   * 获取公告列表数据
   */
  getNoticeListData:function() {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
      data:{pageSize:5},
      success:function(res){
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            noticeList: res.data.data
          });
        }
      },
    })
  },

  /**
   * 获取商品列表数据
   * @param categoryId 商品列表类型id {string/number}
   */
  getGoodsList: function(categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/list',
      data: {
        categoryId: categoryId,
        nameLike: that.data.searchInput
      },
      success: function (res) {
        console.log(res)
        that.setData({
          goods: [],
          loadingMoreHidden: true
        });
        var goods = [];
        if (res.data.code != 0 || res.data.data.length == 0) {
          that.setData({
            loadingMoreHidden: false,
          });
          return;
        }
        goods = res.data.data;
        that.setData({
          goods: goods,
        });
      }
    })
  },
  /**
   * 进入详情页面
   */
  toDetailsTap: function (e){
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  }
})