// 引入ali-oss
const OSS = require('ali-oss')
/**
 *  [accessKeyId] {String}：通过阿里云控制台创建的AccessKey。
 *  [accessKeySecret] {String}：通过阿里云控制台创建的AccessSecret。
 *  [bucket] {String}：通过控制台或PutBucket创建的bucket。
 *  [region] {String}：bucket所在的区域， 默认oss-cn-hangzhou。
 */
export function client(data) { // data后端提供数据
  return new OSS({
    region: 'oss-cn-chengdu', // 修改的地方      地区，我的是oss-cn-beijing
    accessKeyId: 'LTAI4GBuJigXebAiRyDsR3TK', // 修改的地方      刚才AccessKey管理那里的数据
    accessKeySecret: 'rNCgoH2FSQjTq2R6e6zzaWxy3uFFw0', // 修改的地方  刚才AccessKey管理那里的数据
    bucket: 'takeaway-beikehanbao' // 修改的地方  就是创建的bucket名字
  })
}

/**
 * 生成随机文件名称
 * 规则八位随机字符，加下划线连接时间戳
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}
