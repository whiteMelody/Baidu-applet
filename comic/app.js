//app.js
import {
  md5
} from "./utils/md5.js"
App({
  //each 函数
  each(object, callback) {
    var type = (function() {
      switch (object.constructor) {
        case Object:
          return 'Object';
          break;
        case Array:
          return 'Array';
          break;
        case NodeList:
          return 'NodeList';
          break;
        default:
          return 'null';
          break;
      }
    })();
    if (type === 'Array' || type === 'NodeList') {
      [].every.call(object, function(v, i) {
        return callback.call(v, i, v) === false ? false : true;
      });
    } else if (type === 'Object') {
      for (var i in object) {
        if (callback.call(object[i], i, object[i]) === false) {
          break;
        }
      }
    }
  },
  //签名函数
  getAjaxSign(params) {
    var _timestamp = Math.round(new Date().getTime() / 1000);
    var arr = [];
    var str = '';
    if (this.isNull(params)) {
      params = {};
    }
    params.timestemp = _timestamp;
    this.each(params, function(key, value) {
      arr.push(key);
    });
    arr = arr.sort();
    for (var i = 0; i < arr.length; i++) {
      var _tmp = arr[i] + '=' + params[arr[i]] + '&';
      str += _tmp;
    }
    str += 'key=7DF87DDAB965433292F0E7D28A09EA36';
    params.sign = md5(str);
    return params;
  },

  //获取屏幕详情
  getSystemInfo(call) {
    swan.getSystemInfo({
      success: function(res) {
        let windowWidth = res.windowWidth
        let windowHeight = res.windowHeight
        let screen = {
          windowWidth,
          windowHeight
        }
        call(screen)
      }
    })
  },

  isNull: function isNull(obj) {
    if (obj == undefined || obj == 'undefined' || obj == null || obj == 'null' || obj == "" || obj.length == 0) return true;
    else return false;
  },

  indexNull: function indexNull(obj) {
    if (obj == undefined || obj == 'undefined' || obj == null || obj == 'null' || obj.length == 0) return true;
    else return false;
  },

  //存储加入书架的书
  setBookShelf(list) {
    swan.setStorageSync('bookShelf', JSON.stringify(list))
    return true
  },

  //获取加入书架的书
  getBookShelf() {
    let res = swan.getStorageSync('bookShelf')
    if (this.isNull(res)) {
      return []
    } else {
      return JSON.parse(res)
    }
  },

  //存储章节
  setChapter(list) {
    swan.setStorageSync('chapter', JSON.stringify(list))
    return true
  },

  //获取章节
  getChapter() {
    let res = swan.getStorageSync('chapter')
    if (this.isNull(res)) {
      return []
    } else {
      return JSON.parse(res)
    }
  },

  //版本号
  version(call) {
    // let _this = this
    // swan.request({
    //   method: "post",
    //   url: 'https://www.31un.com/api/public/?s=App.QiEng_Common.NovelConfig',
    //   data: {
    //     version: '1.0.1'
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     if (res.data.ret == 200) {
    //       let check = res.data.data.share
    //       if (check) {
    //         //开
    //         call(check)
    //       } else {
    //         //关
    //         call(check)
    //       }
    //     }
    //   }
    // })
  },

  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },

  onLaunch: function() {

  },
  
  globalData: {
    requestUrl: 'https://www.31un.com/api/public/'
  }
})
