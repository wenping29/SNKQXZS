'use strict';
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
exports.main = async (event, context, callback) => {
  try{

    // userCode: userCoe,
      // userPassWord: userPassWord
    console.log(event)
    const result = {}

    let count = await db.collection('userTable').where({
      name: event.userCode ,
      password: event.userPassWord

    }).count()

    console.log(count, 'countcountcountcountcountcountcount')
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

    console.log(count, 'countcountcountcountcountcountcount')
    if (count.total == 0) {
      return {
        msg: '无结果',
        value: 0
      }
    } else {
      console.log(event.userCode)
      let data1 = await db.collection('dateRec').where({
        userid: event.userCode
      }).limit(100).get()
      return {
        msg: '',
        value: 1,
        data: data1
      }
    }
  }catch(e){
    return {
      msg:'查询失败',
      value:4
    }
  }

};