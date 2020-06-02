// pages/videoDetail/videoDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVideo: false,
    commentList: [],
    showShare: false,
    loading: true,
    isLoaded: true,
    controls: false,
    page: 0,
    title: '',
    isEnd: false,
    version: false,
    isPlay: true,
    isShare: false,
    hide: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)

    let _this = this

    if (!app.isNull(options.share)) {
      _this.setData({
        isShare: true,
      })
    } else {
      _this.setData({
        isShare: false,
      })
    }

    _this.setData({
      id: options.id,
      title: options.title,
      count: options.count,
      url: options.url,
      cover: options.cover
    })

    swan.getSystemInfo({
      success: function(res) {
        // console.log('小程序版本库=' + res.SDKVersion)
        let version = res.SDKVersion.slice(0, 3)
        // console.log(version)
        if (version < 2.1) {
          _this.setData({
            version: false
          })
        } else {
          _this.setData({
            version: true
          })
        }
        _this.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })

    _this.playNum()

  },

  playNum() {
    let _this = this
    let id = this.data.id
    swan.request({
      method: "post",
      url: app.globalData.requestUrl + '?s=Cook.Cook_Video.Play',
      data: {
        video_id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.ret == 200) {

        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  play(e) {
    let _this = this
    let isPlay = this.data.isPlay
    console.log(isPlay)

    let video = swan.createVideoContext('myVideo')
    video.pause()
    if (isPlay) {
      video.pause()
      _this.setData({
        isPlay: false,
        hide: true
      })
    } else {
      video.play()
      _this.setData({
        isPlay: true,
        hide: false
      })
    }
  },

  back() {
    swan.reLaunch({
      url: '/pages/video/video'
    })
  },

  bindended(e) {
    console.log(e)
    this.setData({
      isPlay: false,
      hide: false
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 显示分享
  show() {
    this.setData({
      showShare: true
    })
  },

  hide() {
    this.setData({
      showShare: false
    })
  },




  playVideo(e) {
    let id = this.data.id

    swan.createVideoContext('myVideo').pause()

    let _current = swan.createVideoContext('myVideo')

    _current.play()

    this.setData({
      isVideo: true,
    })



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
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    let _this = this
    let title = _this.data.title
    let id = _this.data.id
    let count = _this.data.count
    let url = _this.data.url
    let cover = _this.data.cover

    console.log(e.target.dataset.id)
    console.log(e.target.dataset.count)
    console.log(e.target.dataset.url)
    console.log(e.target.dataset.cover)

    if (e.from == 'button') {
      //分享
      return {
        title: e.target.dataset.title,
        path: '/pages/videoDetail/videoDetail?id=' + e.target.dataset.id + '&count=' + e.target.dataset.count + '&url=' + e.target.dataset.url + '&share=true',
        imageUrl: e.target.dataset.cover + '?x-oss-process=image/resize,m_fill,h_500,w_400,limit_0'
      }
    } else {
      //自带的分享
      return {
        title: title,
        path: '/pages/videoDetail/videoDetail?id=' + id + '&count=' + count + '&url=' + url + '&share=true',
        imageUrl: cover + '?x-oss-process=image/resize,m_fill,h_500,w_400,limit_0'
      }
    }
  }

})