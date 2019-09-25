// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()
  const data = db.collection('userTable').where({ usercode: event.userCode }).count()
  let result = {}
  if (data.total === 0) {
    result = {
      mgs: "用户未注册",
      value: 0
    }
    
  } else {
    let count = await db.collection('userTable').where({ usercode: event.userCode, password: event.userPassWord }).count()
    if (count.total > 0 ) {
      result = {
        mgs: "登录成功",
        value: 1
      }
      await db.collection('userTable').where({
        openid: event.openid
      }).update({
        data: {
          nickName: '',
          openid: ''
        },
        success: function (res1) {
        }
      })

      await db.collection('userTable').where({
        usercode: event.userCode
      }).update({
        data: {
          nickName: event.nickName,
          openid: event.openid
        },
        success: function (res1) {
        }
      })
    } else{
      result = {
        mgs: "密码错误",
        value: 2
      }
    }
  }
  return {
    context,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    data: result
  }
}
