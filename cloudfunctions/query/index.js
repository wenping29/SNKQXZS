'use strict';
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
exports.main = async (event, context, callback) => {
  try {
    const result = {}
    console.log(event)
    let count = await db.collection('userTable').where({
      usercode: event.userCode ,
      password: event.userPassWord
    }).count()
    // console.log(count)
    if (count.total > 0) {
      
    } else {
      return {
        msg:'密码错误',
        value:2
      }
    }
    count = await db.collection('dateRec').where({
      userid: event.userCode
    }).count()
    if (count.total == 0) {
      return {
        msg: '无结果',
        value: 0
      }
    } else {
      let data1 = await db.collection('dateRec').where({
        userid: event.userCode
      }).orderBy('date', 'desc').limit(40).get()
      let dateNow = ''
      if (event.searchDate){
        dateNow = event.searchDate
      } else {
        Date.prototype.Format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
        dateNow = new Date().Format('yyyy-MM')
      }
      let data2 = []
      for (let dataIndex = 0; dataIndex < data1.data.length; dataIndex++) {
        if (data1.data[dataIndex].date.indexOf(dateNow) >= 0) {
          data2.push(data1.data[dataIndex])
        }
      }
      return {
        msg: '',
        value: 1,
        data: { data: data2, errMsg: data1.errMsg}
      }
    }
  }catch(e){
    return {
      msg:'查询失败',
      value:4
    }
  }
};