const Koa = require("koa")

const uploader = require("./lib")

const config = require('./config')

const mount = require("koa-mount")

const app = new Koa()

const options = Object.assign({
  "url": "/api/upload",
  "storeDir": "terminus",
  // "mimetypes": ['image/png','image/bmp'],
  // "provider": "local",
  // "folder": "public",
  // "urlPath": "images"
  // "provider": "oss",
  // "accessKeyId": "xxxxx",
  // "accessKeySecret": "xxxx",
  // "bucket": "xxxx",
  // "region": "oss-cn-hangzhou"
  // "provider": "cos",
  // "bucket": "b2b",
  // "appId": "xxx",
  // "secretID": "xxx",
  // "secretKey": "xx",
  // "region": "gz"
}, config)

app.use(mount('/upload', async (ctx) => {
  ctx.body = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>test</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <form method="POST" action="/api/upload" enctype="multipart/form-data">
      <input type="file" multiple name="file" />
      <br />
      <input type="submit" value="submit"/>
    </form>
    </body>
  </html>
  `
}))

app.use(uploader(options))

app.listen(3000, () => {
  console.log('server is listen 3000')
})
