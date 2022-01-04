function request(path, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:3000' + path,
      method,
      data,
      success: (res) => {
        // console.log(res)
        // cookie是再res里面的
        // 我们需要在这判定是不是登录操作，如果是登录操作
        // 需要把res里面的cookie信息保存起来，后续添加到header
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