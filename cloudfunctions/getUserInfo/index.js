// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const data = await db.collection('userTable').where({ nickName: event.nickName }).count()
  let result = {}
  if (data.total === 0) {
    result = {
      mgs: "用户未注册",
      value: 0
    }
  } else {
    const data2 = await db.collection('userTable').where({ nickName: event.nickName }).get()
    let dataCopy = data2.data.map(v => {
      return v
    })
    result = {
      mgs: "用户未注册",
      value: 1,
      data: dataCopy
    }
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    value: result
  }
}