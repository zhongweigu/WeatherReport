// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      username: '',
      avatar: '',
      personal_text: '',
      phone: '',
      disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let userinfo=wx.getStorageSync('userinfo')
    if(userinfo!=''){
      this.setData({userinfo,username:userinfo.user,avatar:userinfo.avatar,personal_text:userinfo.personal_text,phone:userinfo.phone})
    }
  },

  

  goLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  goDetail(){
    wx.navigateTo({
      url: '/pages/personaldetail/detail',
    })
  },

  goCities(){
    wx.navigateTo({
      url: '/pages/cities/cities',
    })
  },

  goOpts(){
    wx.navigateTo({
      url: '/pages/options/options',
    })
  }
})