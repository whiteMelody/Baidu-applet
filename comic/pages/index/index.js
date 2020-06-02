//index.js
const app = getApp()
Page({
  data: {
    bookShelf: [],
    banner: [],
    check: true,
    showDelete: false,
    bookID: "",
    inedxData: {}
  },

  onLoad: function() {

    //首页推荐
    swan.request({
      url: app.globalData.requestUrl + '?s=App.Cartoon_Common.Recommend',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      method: 'GET',
      success: (res)=> {
        // console.log(res)

        if(res.data.data.code == 200){
          this.setData({
            inedxData: res.data.data.data
          })
        }

      }
    })

    // banner
    swan.request({
      url: app.globalData.requestUrl + '?s=App.Cartoon_Common.Banner',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {},
      method: 'GET',
      success: (res) => {
        // console.log(res)

        if (res.data.data.code == 200) {
          this.setData({
            banner: res.data.data.data
          })
        }

      }
    })

  },

  showDonwLoad() {
    this.setData({
      showDownload: true
    })
  },

  closeDownload() {
    this.setData({
      showDownload: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})