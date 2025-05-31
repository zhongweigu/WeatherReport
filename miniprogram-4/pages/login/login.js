// pages/login/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TitleText:'重新登录',
    btnText:'重新登录',
    btnState:true,
    ToText:'新用户注册',
    userText:'',
    passwordText:'',
  },
   //登录注册页面相互跳转
   change(){
       let that=this
       let type=that.data.TitleText
       if(type=='重新登录')
       {
           that.setData({
            TitleText:'注册',
            btnText:'注册',
            ToText:'返回登录',
            userText:'',
            passwordText:'',
            userValue:'',
            passwordValue:'',
            btnState:true
           })
       }
       else{
        that.setData({
            TitleText:'重新登录',
            btnText:'重新登录',
            ToText:'新用户注册',
            userText:'',
            passwordText:'',
            userValue:'',
            passwordValue:'',
            btnState:true
           })           
       }
   },
   ///获取用户名和密码
   getinput(e){
       let that=this
       let type=e.currentTarget.dataset.id
       let value=e.detail.value
       console.log(type,':',value);
       if(type=='user')
       {
           that.setData({userText:value})
       }
       else{
           that.setData({passwordText:value})
       }
       if(that.data.userText && that.data.passwordText)
       {
           that.setData({btnState:false})
       }
       else{
            that.setData({btnState:true})
       }
   },
   
   login(){
    let that=this
    let type=that.data.TitleText
    //注册
    if(type=='注册')
    {
     wx.showLoading({
       title: '正在注册',
     })
     let data={
             user:that.data.userText,
             password:that.data.passwordText,
             phone:'',
             personal_text:'',
            avatar:'/static/images/user.jpg'
         }
        wx.setStorageSync('userinfo', data)
         wx.hideLoading()
         that.setData({
             TitleText:'重新登录',
             btnText:'重新登录',
             ToText:'新用户注册',
             userValue:that.data.userText,
             passwordValue:that.data.passwordText,
             btnState:false
         })

    }
    //登录
    else{
     wx.showLoading({
         title: '正在登录',
       })
        let userinfo=[] || ''
        userinfo=wx.getStorageSync('userinfo')
        console.log('userinfo',userinfo);
        if(userinfo.user==that.data.userText)
        {
            if(userinfo.password==that.data.passwordText)
            {
                wx.hideLoading()
                wx.navigateBack()
            }
            else{
                wx.hideLoading()
                wx.showToast({
                  title: '密码错误',
                  icon:'error',
                  duration:1500
                })
            }
        }
        else{
            wx.hideLoading()
            wx.showToast({
              title: '用户名不存在',
              icon:'none',
              duration:1500
            })
        }

    }
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