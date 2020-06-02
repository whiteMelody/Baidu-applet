//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date: '',
    everyDay: {},
    audioList: [1,2,3,4],
    videoList: [1,2,3,4],
    newList: [1,2,3,4,5],
  },
  onLoad() {

    swan.login({
    success: function (res) {
      
      if (res.code) {
          //发起网络请求
          swan.request({
            url: app.globalData.requestUrl + '?s=App.Album_User.GetWxOpenID',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res2) {

              //获取用户信息
              swan.getUserInfo({
                success: function (res) {

                  //res.data  加密的敏感数据
                  
                  //res.iv  加密算法的初始向量

                  //res.userInfo 用户数据

                  console.log('-------------res-------------')
                  console.log(res.userInfo)

                  return false;

                  var openID = res2.data.data.openid
                  var name = res.userInfo.nickName
                  var head = res.userInfo.avatarUrl
                  var encryptedData = res.encryptedData
                  var iv = res.iv
                  var unionID = res2.data.data.unionid

                  // return false;

                  swan.request({
                    method: "post",
                    url: app.globalData.requestUrl + '?s=App.Album_User.WxLogin',
                    data: { openID: openID, encryptedData: encryptedData, iv: iv, name: name, head: head, unionID: unionID },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      var userID = res.data.data.user_id
                      swan.setStorage({
                        key: "userinfo",
                        data: { name, head, openID, userID, createtime: res.data.data.createtime },
                        success: function (res) {
                        }
                      })
                      //登录成功
                      _this._confirmEvent()
                    }
                  })
                }
              })
            }, fail: (res2) => {
              _this._cancelEvent()
              console.log(res2)
            }
          })
        } else {
          _this._cancelEvent()
          console.log('获取用户登录态失败！' + res.errMsg)
        }
    },
      fail: function (err) {
          console.log('login fail', err);
      }
  });
    
    //获取数据
    swan.request({
      method: "post",
      url: app.globalData.requestUrl + 'hot/v3/hotChannel',
      data: { learningType: 0, userID: 0, rating: 0, deviceID: 0, type: 4 },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {

        if (res.data.status == 1) {

          let _data = res.data.returnJSON

          let _audioList = []

          let _videoList = []

          let _newList = []

          for (let i = 0; i < _data.length; i++) {

            if (_data[i].moduleType == 1) {
              //为您订制
            }
            if (_data[i].moduleType == 2) {
              //每日推荐
            }
            if (_data[i].moduleType == 3) {
              //大卡推荐
            }
            if (_data[i].moduleType == 4) {
              //热门音频
              _audioList = _data[i].dataList.slice(0, 4);
            }
            if (_data[i].moduleType == 5) {
              //热门视频
              _videoList = _data[i].dataList.slice(0, 4);
            }
            if (_data[i].moduleType == 6) {
              //最近更新
              _newList = _data[i].dataList;
            }

          }

          this.setData({
            audioList: _audioList,
            videoList: _videoList,
            newList: _newList,
          })

        }
        
      }
    })

    //获取每日一句
    let date = new Date();
    let _date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    // let _date = '2018-11-26';

    //获取数据
    swan.request({
      method: "post",
      url: app.globalData.requestUrl + 'hot/getEveryDayEnglishByDateV2',
      data: { date: _date, learningType: 0, userID: 0, rating: 0, deviceID: 0, type: 4 },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.status == 1) {

          let _data = res.data.returnJSON[0]

          this.setData({
            date: _date,
            everyDay: _data
          })

        }

      }
    })

  },
})
