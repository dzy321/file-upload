module.exports = {
  fileResolve: (file) => {
    return new Promise((resolve, reject) => {
      file.resume()
      file.on("end", () => {
        resolve()
      })
      file.on("error", (err) => {
        reject(err)
      })
    })
  }
}