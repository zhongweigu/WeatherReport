
// pages/page1/page1.js
Page({
  data: {
    city:'',
    flag:false,
    weather:{},
    hour:[], 
  },
  get_weather(){
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      method:"GET",
      data:{
        key: '44aa6821c29b4daab833f0caa586b10f',
        location:'101190101'
      },
      success:(res)=>{
        console.log(res),
        this.setData({
             weather:res.data.now,
             flag:true
        })
      }
    })
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/24h',
      data:{
        key: '44aa6821c29b4daab833f0caa586b10f',
        location:'101190101'
      },
      success:(res)=>{
        console.log(res.data)
        let weatherData=res.data;
        let hourlyWeather=weatherData.hourly.slice(0,24);
        let time=hourlyWeather.map(item=>{
          let times=item.fxTime.substring(11,16);
          return times;
        })
        this.setData({
          hour:hourlyWeather,
          flag:true,
          times:time
        })
      }
    })
  },

  onLoad(option){
    this.get_weather()
  },
  
})