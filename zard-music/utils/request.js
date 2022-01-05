import config from './config'

function request(path, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + path,
      method,
      data,
      header: {
        cookie: wx.getStorageSync('cookie_key') && wx.getStorageSync('cookie_key').find(item => item.startsWith('MUSIC_U'))
      },
      success: (res) => {
        // console.log(res)
        // cookie是再res里面的
        // 我们需要在这判定是不是登录操作，如果是登录操作
        // 需要把res里面的cookie信息保存起来，后续添加到header
        if (data.isLogin) {
          // 再这里判断是不是登陆
          // 如果是登陆，需要保存cookie
          wx.setStorageSync('cookie_key', res.cookies)
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default request


// request(路径,参数,请求方式)