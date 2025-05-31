const app = getApp();

Page({
  data: {
    cur_id: app.curid,
    searchCity: '',
    weatherList: [], // 存储天气信息的数组
  },

  // 输入城市名称
  onCityInput(e) {
    this.setData({
      searchCity: e.detail.value
    });
  },

  
     
    
  

  // 搜索城市并获取天气
  searchWeather() {
    const city = this.data.searchCity;
    if (!city) {
      wx.showToast({
        title: '请输入城市名',
        icon: 'none'
      });
      return;
    }


    // 第一步：地址解析获取adcode
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${city}&key=EMKBZ-4JI67-ISJXQ-PGKN4-IWI3E-KTFOJ`,
      header: {
        'content-type': 'application/json'
      },
      success: (geoRes) => {
        if (geoRes.statusCode === 200 && geoRes.data.result) {
          console.log('地理编码响应:', geoRes);
          console.log('adcode:',geoRes.data.result.ad_info.adcode );
          const adcode = geoRes.data.result.ad_info.adcode;
          
          // 第二步：获取天气信息
          wx.request({
            url: `https://apis.map.qq.com/ws/weather/v1/?key=EMKBZ-4JI67-ISJXQ-PGKN4-IWI3E-KTFOJ&adcode=${adcode}&type=future`,
            header: {
              'content-type': 'application/json'
            },
            success: (weatherRes) => {
              if (weatherRes.data.result && weatherRes.data.result.forecast) {
                console.log('天气响应:', weatherRes.data.result.forecast[0]);
                const newWeather = {
                  city: city,
                  adcode: adcode,
                  forecast: weatherRes.data.result.forecast[0].infos[0],
                  id: Date.now() // 用于唯一标识每个天气卡片
                };

                // 添加新的天气信息到数组
                const updatedList = [...this.data.weatherList, newWeather];
                this.setData({
                  weatherList: updatedList,
                  searchCity: '' // 清空搜索框
                });
              } else {
                wx.showToast({
                  title: '未找到天气信息',
                  icon: 'none'
                });
              }
            },
            fail: (err) => {
              wx.showToast({
                title: '天气查询失败',
                icon: 'none'
              });
              console.error('天气请求失败:', err);
            }
          });
        } else {
          wx.showToast({
            title: '未找到该城市',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '地址解析失败',
          icon: 'none'
        });
        console.error('地理编码请求失败:', err);
      }
    });
  },

  // 删除天气卡片
  deleteWeather(e) {
    const id = e.currentTarget.dataset.id;
    const updatedList = this.data.weatherList.filter(item => item.id !== id);
    this.setData({
      weatherList: updatedList
    });
  },

  // 初始化时获取当前位置天气
  onLoad: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;

        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=EMKBZ-4JI67-ISJXQ-PGKN4-IWI3E-KTFOJ&get_poi=1`,
          header: {
            'content-type': 'application/json'
          },
          success: (geoRes) => {
            if (geoRes.statusCode === 200) {
              const result = geoRes.data.result;
              if (result) {
                const adcode = result.ad_info.adcode;
                const city = result.address_component.city;

                wx.request({
                  url: `https://apis.map.qq.com/ws/weather/v1/?key=EMKBZ-4JI67-ISJXQ-PGKN4-IWI3E-KTFOJ&adcode=${adcode}&type=future`,
                  header: {
                    'content-type': 'application/json'
                  },
                  success: (weatherRes) => {
                    if (weatherRes.data.result && weatherRes.data.result.forecast) {
                      console.log('天气响应:', weatherRes.data.result.forecast[0].infos[0]);
                      const initialWeather = {
                        city: city,
                        adcode: adcode,
                        forecast: weatherRes.data.result.forecast[0].infos[0],
                        id: Date.now()
                      };

                      this.setData({
                        weatherList: [initialWeather]
                      });
                    }
                  },
                  fail: (err) => {
                    console.error('天气请求失败:', err);
                  }
                });
              }
            }
          },
          fail: (err) => {
            console.error('地理编码请求失败:', err);
          }
        });
      },
      fail: (err) => {
        console.error('位置获取失败:', err);
      }
    });
  }
});