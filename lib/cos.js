const qcloud = require("qcloud_cos_v4")

let cos

module.exports = (options) => {
  // {
  //   bucket: "xxxx",
  //   appId: "xxxx",
  //   secretID: "xxxx",
  //   secretKey: "xxxx",
  //   region: "gz|sh|tj"
  // }
  const {bucket, appId, secretID, secretKey, region} = options
  if (!cos) {
    qcloud.conf.setAppInfo(appId, secretID, secretKey, region)
    cos = qcloud.cos
  }

  return {
    put: (filename, file) => {
      return new Promise((resolve, reject) => {
        file.on('data', () => { })
        file.on("end", () => {
          cos.upload(file.path, bucket, filename, "", 1, (ret) => {
            console.log('ret:', ret)
            if (ret.code == 0) {
              resolve()
            } else {
              reject(`Code: ${ret.code} .Message: ${ret.message}`)
            }
          })
        })
      })
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `//${bucket}-${appId}.file.myqcloud.com/${result[filename]}`
      })
      return result
    }
  }

}