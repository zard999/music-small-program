function request(url, data = {}, method = 'GET') {
	return new Promise((resolve, reject) => {
		wx.request({
			url: 'http://localhost:3001' + url,
			data,
			method,
			success: res => {
				resolve(res.data)
			},
			fail: err => {
			reject(err)
			}
		})
	})

}

export default request
