const oss = require("ali-oss").Wrapper

module.exports = (options) => {
  // {
  //    accessKeyId:     "keyId",
  //    accessKeySecret: "secret",
  //    bucket:          "terminus-designer",
  //    region:          "oss-cn-hangzhou"
  // }
  if (!(options.accessKeyId && options.accessKeySecret && options.bucket && options.region)) {
    throw new Error("Missing option in options: [accessKeyId, accessKeySecret, bucket, region]")
  }
  const store = new oss(options)

  return {
    put: (filename, file) => {
      const opts = options.attachment === true ? {
        headers: {
          "Content-Disposition": `attachment;filename=${encodeURIComponent(file.filename)}`
        }
      } : undefined
      return store.put(filename, file, opts)
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `${options.targetProtocol ? `${options.targetProtocol}:` : ''}//${options.bucket}.${options.region}.aliyuncs.com/${result[filename]}`
      })
      return result
    }
  }
}
