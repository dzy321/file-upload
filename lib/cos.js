const qcloud = require("qcloud_cos_v4")
const util = require("./util")

let cos

module.exports = (options) => {
  // {
  //   bucket: "xxxx",
  //   appId: "xxxx",
  //   secretID: "xxxx",
  //   secretKey: "xxxx",
  //   region: "gz|sh|tj"
  // }
  let {bucket, appId, secretID, secretKey, region, targetHost, targetProtocol} = options
  if (!cos) {
    qcloud.conf.setAppInfo(appId, secretID, secretKey, region)
    cos = qcloud.cos
  }

  if (targetProtocol) {
    targetProtocol = `${targetProtocol}:`
  } else {
    targetProtocol = ""
  }
  if (!targetHost) {
    targetHost = `${bucket}-${appId}.file.myqcloud.com`
  }

  return {
    put: async (filename, file) => {
      await util.fileResolve(file)
      return new Promise((resolve, reject) => {
        cos.upload(file.path, bucket, filename, "", 1, (ret) => {
          if (ret.code == 0) {
            resolve()
          } else {
            reject(`Code: ${ret.code} .Message: ${ret.message}`)
          }
        })
      })
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `${targetProtocol}//${targetHost}/${result[filename]}`
      })
      return result
    }
  }

}