'use strict';
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
exports.main = async (event, context, callback) => {
  // console.log(event.usercode)
  const result = {}
  let count = await db.collection('userTable').where({
    usercode: event.usercode // 填入当前用户 openid
  }).count()

  // console.log(count,'countcountcountcountcountcountcount')
  if (count.total >0) {
    return {
      msg:'已经注册',
      value:0
    }
  } else{
    return await db.collection('userTable').add({
      data: {
        country: event.contry,
        likething: event.likething,
        name: event.name,
        password: event.password,
        usercode: event.usercode
      }
    })
  }
};