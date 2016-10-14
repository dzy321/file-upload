const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

module.exports = (options) => {
  // {
  //    folder:  "/public/images",
  //    urlPath: "/images"
  // }
  if (!(options.folder)) {
    throw new Error("Missing option in options: [folder]")
  }

  if (!options.urlPath) {
    options.urlPath = options.folder
  }

  return {
    put: (filename, file) => {
      return new Promise((resolve, reject) => {
        const filepath = path.join(process.cwd(), options.folder, filename)
        mkdirp.sync(path.dirname(filepath))
        const stream = fs.createWriteStream(filepath)
        file.pipe(stream)
        file.on("end", () => { return resolve(filename) })
      })
    },
    get: (result) => {
      Object.keys(result).map(filename => {
        return result[filename] = `/${path.join(options.urlPath, result[filename])}`
      })
      return result
    }
  }
}
