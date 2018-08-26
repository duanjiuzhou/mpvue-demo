// 工具函数库

import config from './config'

export function get (url) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: config.host + url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code === 0) {
          reslove(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
