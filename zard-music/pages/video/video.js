// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    currentNavId: '',
    videoList: [],
    vid: '',
    flag: false,
    recordList: [] //保存视频的播放记录
    // 每个视频的播放记录是一个对象，里面包含id和time
  },

  // 点击nav切换
  changNav(event) {
    // let currentNavId = +event.target.id
    let currentNavId = +event.target.dataset.id
    this.setData({
      currentNavId
    })
    // 点击成功后调用
    this.getVideoList()
  },

  // 获取navList数据
  async getNavList() {
    const result = await request('/video/group/list')
    if (result.code === 200) {
      this.setData({
        navList: result.data.slice(0, 11),
        currentNavId: result.data[0].id
      })
      // 获取navList成功后
      this.getVideoList()
    }
  },

  // 获取vedioList数据
  async getVideoList() {
    const result = await request('/video/group', {
      id: this.data.currentNavId
    })
    if (result.code === 200) {
      this.setData({
        videoList: result.datas.map(item => item.data),
        flag: false // 关闭三个点
      })
    }
  },

  // 点击视频控制视频播放：单例模式
  playOrPause(event) {
    // 拿到video组件标签的id值，要和视频上下文进行绑定
    this.setData({
      vid: event.target.id
    })

    if (!this.player) {
      // 代表第一次点不存在,创建执行上下文
      this.player = wx.createVideoContext(this.data.vid)
      // 控制播放
      this.player.play()
      // 存储视频的id，用于下一次点击的时候判断时候是点的同一个
      this.vid = this.data.vid
      // 保存视频的播放状态，用于判断下次点的是同一个的时候，播放状态如何设置
      this.isPlay = true
    } else {
      // 代表非第一次
      // 判断点的是不是同一个视频
      if (this.vid === this.data.vid) {
        // 点的是同一个
        if (this.isPlay) {
          this.player.pause()
          this.isPlay = false
        } else {
          this.player.play()
          this.isPlay = true
        }
      } else {
        // 点的不是同一个
        this.player.pause()
        this.player = wx.createVideoContext(this.data.vid)

        // 需要看看播放记录数组中是否存在当前歌曲的播放记录
        // 如果存在，需要把时间跳转到记录的位置，要写在play上面
        let obj = this.data.recordList.find(item => item.vid === this.data.vie)
        obj && this.player.seek(obj.currentTime)

        this.player.play()
        this.isPlay = true
        this.vid = this.data.vid
      }
    }
  },

  // 每次视频播放的时候，收集播放进度（时间）和 id，形成播放记录对象
  handleTimeUpdate(event) {
    // 先判断数组当中是否已经存在当前这个视频记录
    let recordList = this.data.recordList
    let obj = recordList.find(item => item.vid === this.data.vid)
    if (obj) {
      obj.currentTime = event.detail.currentTime
    } else {
      // 如果不存在，再去创建新的记录添加到数组中
      obj = {
        vid: this.data.vid,
        currentTime: event.detail.currentTime
      }
      recordList.push(obj)
    }
    this.setData({
      recordList
    })
  },

  // 视频播放结束，删除播放记录
  handleEnd() {
    let recodeList = this.data.recordList
    let index = recordList.findIndex(item => item.vid === this.data.vid)
    index !== -1 && recodeList.splice(index, 1)
    console.log(index);
    this.setData({
      recordList
    })
  },

  // 下拉刷新
  handleResherrefresh() {
    // 设置三个点显示
    this.setData({
      flag: true
    })

    // 重新发请求获取视频列表
    this.getVideoList()
  },

  // 上拉触底
  handleScrolltolower() {
    let videoList = this.data.videoList
    // videoList = videoList.concat(videoList)
    videoList = [...videoList, ...videoList]
    if(videoList.length < 100){
      this.setData({
        videoList
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList()
    // this.getVideoList()
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
  onShareAppMessage: function ({from}) {
    if(from === 'button'){
      // 点的是页面的按钮
      return {
        title: 'Zart',
        path: '/pages/video/video',
        imageUrl: '/static/images/recommendSong/recommendSong.jpg'
      }
    }
  }
})