// pages/recommend/recommend.js
import request from '../../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '00',
    month: '00',
    songList: [],
    songId: ''
  },

  // 获取每日歌曲数据
  async getSongList() {
    const result = await request('/recommend/songs')
    if (result.code === 200) {
      this.setData({
        songList: result.recommend.map(item => {
          return {
            id: item.id,
            songName: item.name,
            songImg: item.album.picUrl,
            author: item.artists[0].name
          }
        })
      })
    }
  },

  // 点击歌曲去到歌曲的详情页去自动播放
  toDetail(event) {
    let songId = event.currentTarget.id
    // 保存点击的歌曲id，为了后期上一曲下一曲的时候找到当前歌曲
    this.setData({
      songId
    })
    wx.navigateTo({
      url: '/package/pages/detail/detail?songId=' + songId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    this.getSongList()

    PubSub.subscribe('songType', (msg, type) => {
      // 先找到当前的歌曲下标
      let index = this.data.songList.findIndex(item => item.id === this.data.songId * 1)
      let newIndex = -1
      if (type === 'prev') {
        newIndex = index - 1 < 0 ? this.data.songList.length - 1 : index - 1
      } else {
        newIndex = index + 1 > this.data.songList.length - 1 ? 0 : index + 1
      }
      // 找到上一首或者下一首的id，我们也得通信
      let songId = this.data.songList[newIndex].id
      PubSub.publish('songId', songId)
      // 保存最新的歌曲id，以供下一次使用
      this.setData({
        songId
      })
    })
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