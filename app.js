//app.js
App({
  onLaunch: function() {
    // 校验用户当前session_key是否有效
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('校验用户session_key', '正常')
      },
      fail: ()=> {
        console.log('校验用户session_key', '失效')
        // session_key 已经失效，需要重新执行登录流程
        this.doLogin()
      }
    })
    
  },
  // 登录
  doLogin: function() {
    // wx.login({
    //   success: (res) => {
    //     console.log('登录！', res.code)
    //   }
    // });
  },
})