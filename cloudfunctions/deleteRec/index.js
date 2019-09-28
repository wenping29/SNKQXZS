// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id = event.id
  console.log(id)
  try {
    return await db.collection('dateRec').doc(id).remove()
 
  } catch (e) {
    console.log(e)
    return {
      event,
      value: '0',
      msg: '删除失败',
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    }
  }

}