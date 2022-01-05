// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },

  handlerInput(event) {
    let type = event.target.id
    this.setData({
      [type]: event.detail.value
    })
  },

  async login() {
    let {
      phone,
      password
    } = this.data
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号不合法',
      })
      return
    }

    if (!/^\w{5,20}$/.test(password)) {
      wx.showToast({
        title: '密码不正确',
      })
      return
    }
    const result = await request('/login/cellphone', {
      phone,
      password,
      isLogin: true
    })
    if (result.code === 200) {
      wx.setStorageSync('userInfo_key', result.profile)
      console.log(result.profile);
      // 针对tarbar页面
      wx.reLaunch({
        url: '/pages/center/center',
      })
    } else if (result.code === 400) {
      wx.showToast({
        title: '手机号码有误',
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: '密码错误',
      })
    }
  },

  // getPhone(event) {
  //   this.setData({
  //     phone: event.detail.value
  //   })
  // },

  // getPassword(event) {
  //   this.setData({
  //     passwrod: event.detail.value
  //   })
  // },

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

  }
})