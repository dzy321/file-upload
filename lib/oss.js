const oss = require("ali-oss").Wrapper
const util = require("./util")

module.exports = (options) => {
  // {
  //    accessKeyId:     "keyId",
  //    accessKeySecret: "secret",
  //    bucket:          "terminus-designer",
  //    region:          "oss-cn-hangzhou"
  // }
  let { accessKeyId, accessKeySecret, bucket, region, targetProtocol, attachment, targetHost } = options

  if (!targetHost) {
    targetHost = `${bucket}.${region}.aliyuncs.com`
  }

  if (!(accessKeyId && accessKeySecret && bucket && region)) {
    throw new Error("Missing option in options: [accessKeyId, accessKeySecret, bucket, region]")
  }
  const store = new oss(options)

  return {
    put: async (filename, file) => {
      await util.fileResolve(file)
      const opts = attachment === true ? {
        headers: {
          "Content-Disposition": `attachment;filename=${encodeURIComponent(file.filename)}`
        }
      } : undefined
      return store.put(filename, file.path, opts)
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `${targetProtocol ? `${targetProtocol}:` : ""}//${targetHost}/${result[filename]}`
      })
      return result
    }
  }
}
