// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    pageSize: 10,
    videoList: [{
        cover_img: '/images/loading.png'
      },
      {
        cover_img: '/images/loading.png'
      },
      {
        cover_img: '/images/loading.png'
      },
      {
        cover_img: '/images/loading.png'
      },
      {
        cover_img: '/images/loading.png'
      }
    ],
    inited: false,
    disable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.onReachBottom()

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {




  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function() {

  //   swan.showNavigationBarLoading()

  //   swan.stopPullDownRefresh()

  //   this.setData({
  //     videoList: [],
  //     page: 0,
  //     disable: false
  //   })

  //   this.onReachBottom()
  //   swan.hideNavigationBarLoading()

  // },

  videoDetail(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    let url = e.currentTarget.dataset.url
    let cover = e.currentTarget.dataset.cover
    let videoList = this.data.videoList
    let index = e.currentTarget.dataset.index

    console.log(e)

    console.log(videoList)

    videoList[index].play = videoList[index].play + 1
    let count = videoList[index].play
    this.setData({
      videoList: videoList,
    })
    swan.navigateTo({
      url: '/pages/videoDetail/videoDetail?id=' + id + '&title=' + title + '&count=' + count + '&url=' + url + '&cover=' + cover
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let _this = this
    if (this.data.disable) {
      return false
    }
    let page = this.data.page
    let pageSize = this.data.pageSize
    page++
    swan.request({
      method: "post",
      url: app.globalData.requestUrl + '?s=Cook.Cook_Video.VideoList',
      data: {
        page: page,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.ret == 200) {
          let tmp = res.data.data
          if (tmp.length == 0 || tmp.length < 10) {
            console.log('暂无更多数据')
            _this.setData({
              disable: true,
            })
          }
          let videoList = _this.data.videoList;

          if (this.data.inited) {
            videoList = videoList.concat(tmp)
          } else {
            videoList = tmp
          }

          console.log(videoList)
          _this.setData({
            inited: true,
            videoList: videoList,
            page: page
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function (e) {

  // }


})