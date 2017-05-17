const azure = require("azure-storage")
const util = require("./util")

module.exports = (options) => {
  // {
  //   container: "xxxx",
  //   account: "xxxx",
  //   connectionString: "xxxx",
  // }
  let { container, account, connectionString, targetProtocol, targetHost } = options
  if (!(account && container && connectionString)) {
    throw new Error("Missing option in options: [container, account, connectionString]")
  }
  if(targetProtocol) {
    targetProtocol = `${targetProtocol}:`
  } else {
    targetProtocol = ""
  }
  if (!targetHost) {
    targetHost = `${account}.blob.core.chinacloudapi.cn`
  }

  const blobSvc = azure.createBlobService(connectionString)

  return {
    put: async (filename, file) => {
      await util.fileResolve(file)
      return new Promise((resolve, reject) => {
        blobSvc.createBlockBlobFromLocalFile(container, filename, file.path, (err, result, res) => {
          err ? reject(err) : resolve()
        })
      })
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `${targetProtocol}//${targetHost}/${container}/${result[filename]}`
      })
      return result
    }
  }

}