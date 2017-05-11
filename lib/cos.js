const cos = require("cos-nodejs-sdk-v5")
const config = require("cos-nodejs-sdk-v5/sdk/config")
const fs =  require("fs")
const util = require("./util")

module.exports = (options) => {
  // {
  //   bucket: "xxxx",
  //   appId: "xxxx",
  //   secretID: "xxxx",
  //   secretKey: "xxxx",
  //   region: "gz|sh|tj"
  // }
  let { bucket, appId, secretID, secretKey, region, targetHost, targetProtocol } = options
  config.APPID = appId
  config.SECRET_ID = secretID
  config.SECRET_KEY = secretKey

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
        cos.putObject({
          Bucket: bucket,
          Region: region,
          Key: filename,
          Body: file.path,
          ContentLength: fs.statSync(file.path).size
        }, (err, data) => {
          if (err) {
            reject(`Code: ${err.error.Code} .Message: ${err.error.Message}`)
          } else {
            resolve()
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