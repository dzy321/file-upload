const uuid = require("uuid")
const path = require("path")
const mount = require("koa-mount")
const parse = require("async-busboy")
const dateformat = require("dateformat")

const imageUpload = (opts) => {

  let store
  try {
    store = require(`./${opts.provider}`)(opts)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }

  const {mimetypes} = opts

  return async (ctx, next) => {
    // Validate Request
    if ("POST" !== ctx.method && !ctx.request.is("multipart/*")) {
      return await next()
    }

    // Parse request for multipart
    const {files, fields} = await parse(ctx.req)

    // Check if any file is not valid mimetype
    if (mimetypes) {
      const invalidFiles = files.filter(file => {
        return !mimetypes.includes(file.mimeType)
      })

      // Return err if any not valid
      if (invalidFiles.length !== 0) {
        ctx.status = 400
        ctx.body = `Error: Invalid type of files ${invalidFiles.map(file => { return file.filename })}`
        return
      }
    }
    // Generate oss path
    let result = {}
    files.forEach(file => {
      result[file.filename] = `${dateformat(new Date(), "yyyy/mm/dd")}/${uuid.v4()}${path.extname(file.filename)}`
    })

    // Upload to OSS or folders
    try {
      await Promise.all(files.map(file => { return store.put(result[file.filename], file) }))
    } catch (err) {
      ctx.status = 500
      ctx.body = `Error: ${err}`
      return
    }

    // Return result
    ctx.status = 200
    // Support < IE 10 browser
    ctx.res.setHeader("Content-Type", "text/html")
    ctx.body = JSON.stringify(store.get(result))
    return
  }
}

module.exports = (options) => {
  if (!options.url) {
    throw new Error('Can not find option url')
  }
  return mount(options.url, imageUpload(options))
}
