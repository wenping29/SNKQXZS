'use strict';
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()

exports.main = async (event, context, callback) => {
  const result = {}
  let count = await db.collection('dateRec').where({
    userid: event.userCode,
    date: event.date
  }).count()
  if (count.total > 0) {
    return {
      msg: '已经打过卡了',
      value: 0
    }
  } else {
    return await db.collection('dateRec').add({
      data: {
        date: event.date,
        time: event.time,
        overTime: event.overTime,
        userid: event.userCode
      }
    })
  }
};
