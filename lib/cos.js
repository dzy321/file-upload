const COS = require("cos-nodejs-sdk-v5")
// const config = require("cos-nodejs-sdk-v5/sdk/config")
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

 
  // config.APPID = appId
  // config.SECRET_ID = secretID
  // config.SECRET_KEY = secretKey

  if (!(bucket && appId && secretID && secretKey && region)) {
    throw new Error("Missing option in options: [bucket, appId, secretID, secretKey, bucket, region]")
  }
  
   const cos = new COS({
      SecretId: secretID,
      SecretKey: secretKey,
    })
  
   
//   qcloud.conf.setAppInfo(appId, secretID, secretKey, region)
//   const cos = qcloud.cos


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
          Body: fs.createReadStream(file.path) ,
          ContentLength: fs.statSync(file.path).size,
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData));
        }
        }, (err, data) => {
          console.log(err)
          if (err) {
            reject(`Code: ${err.error.code} .Message: ${err.error.message}`)
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
