// pages/personaldetail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
      avatar: '',
      personal_text: '',
      phone: '',
      disabled: true,
  },

  getinput(e){
    let type=e.currentTarget.dataset.id
    let value=e.detail.value
    console.log(type,':',value);
    
      if(type == 'user'){ 
        let userinfo = this.data.userinfo
        userinfo.user = value
        wx.setStorageSync('userinfo', userinfo)
        this.setData({username:value,disabled:false})
      }else if(type ==  'phone'){
        let userinfo = this.data.userinfo
        userinfo.phone = value
        wx.setStorageSync('userinfo', userinfo)
        this.setData({phone:value,disabled:false})
      }else {
        let userinfo = this.data.userinfo
        userinfo.personal_text = value
        wx.setStorageSync('userinfo', userinfo)
        this.setData({personal_text:value,disabled:false})
      }
  },

  save() {
    this.setData({disabled: true})
    wx.navigateBack();
  },

  chooseImage(e){
    let that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        let userinfo = that.data.userinfo
        userinfo.avatar = res.tempFiles[0].tempFilePath
        wx.setStorageSync('userinfo', userinfo)
        that.setData({avatar:res.tempFiles[0].tempFilePath,disabled:false})
      }
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})