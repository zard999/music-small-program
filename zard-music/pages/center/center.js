import request from '../../utils/request'
// pages/center/center.js
let startY = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    translateY: '',
    transition: '',
    userInfo: '',
    recordList: ''
  },

  // 处理覆盖盒子向下拖拽回弹
  handlerStart(event) {
    startY = event.touches[0].clientY
    this.setData({
      transition: ''
    })
  },

  handlerMove(event) {
    let endY = event.touches[0].clientY
    let disY = endY - startY
    if (disY < 0) {
      disY = 0
    } else if (disY > 300) {
      disY = 300
    }
    this.setData({
      translateY: disY + 'rpx',
    })
  },

  handlerEnd() {
    this.setData({
      translateY: 0,
      transition: 'transform 1s'

    })
  },

  // 点击图像去登录
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 获取用户的播放记录
  async getRecordList() {
    const result = await request('/user/record', {
      type: 0,
      uid: this.data.userInfo.userId
    })
    if (result.code === 200) {
      this.setData({
        recordList: result.allData.slice(0, 15).map(item => {
          return {
            id:item.song.al.id,
            songImg: item.song.al.picUrl
          }
        })
      })
      console.log(result);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo_key')
    this.setData({
      userInfo
    })
    if (userInfo.nickname) {
      this.getRecordList()
    }
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

  }
})