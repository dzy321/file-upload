const ObsClient = require("obs-sdk")
const util = require("./util")

module.exports = (options) => {
  // {
  //   bucket: "xxxx",
  //   accessKeyId: "xxxx",
  //   accessKeySecret: "xxxx",
  //   server: "xxxx",
  // }
  let { bucket, accessKeyId, accessKeySecret, server, targetHost, targetProtocol } = options
  if (!(bucket && accessKeyId && accessKeySecret && server)) {
    throw new Error("Missing option in options: [bucket, accessKeyId, accessKeySecret, server]")
  }
  const obs = new ObsClient()
  obs.Factory(accessKeyId, accessKeySecret, true, server, true, true)
  obs.InitLog('error')

  if (targetProtocol) {
    targetProtocol = `${targetProtocol}:`
  } else {
    targetProtocol = ""
  }
  if (!targetHost) {
    targetHost = server
  }

  return {
    put: async (filename, file) => {
      await util.fileResolve(file)
      return new Promise((resolve, reject) => {
        obs.PutObject({
          "Bucket": bucket,
          "Key": filename,
          "ACL": 'public-read-write',
          'SourceFile': file.path
        }, function (err, result) {
          err ? reject(err) : resolve()
        })
      })
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `${targetProtocol}//${targetHost}/${bucket}/${result[filename]}`
      })
      return result
    }
  }

}