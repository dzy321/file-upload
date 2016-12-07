# koa2-image-upload

koa2 middle to upload file

### Features

- support upload to dir

```javascript
options['upload'] = {
  "url": '/api/upload',
  "storeDir": 'xxx',
  "provider": "local",
  "mimetypes": ['image/png','image/bmp'], // 如果没有配置,将不进行类型检查 http://www.freeformatter.com/mime-types-list.html
  "folder": "public",
  "urlPath": "images"
}
```

- support upload to oss

```javascript
options["upload"] = {
  "url": '/api/upload',
  "provider": "oss",
  "storeDir": 'xxx',
  "mimetypes": ['image/png','image/bmp'],
  "accessKeyId": "key",
  "accessKeySecret": "secret",
  "bucket": "terminus-designer",
  "region": "oss-cn-hangzhou",
  "targetProtocol": "http", // default null
  "attachment": true // default null
}
```

- support upload to cos

```javascript
options["upload"] = {
  "url": '/api/upload',
  "provider": "cos",
  "storeDir": 'xxx',
  "bucket": "b2b",
  "appId": "xxx",
  "secretID": "xxx",
  "secretKey": "xx",
  "region": "gz"
}
```

### How to use

```javascript
app.use(uploader(options))
```

### Requirements

- Node v6.0+

## Workflow

- `npm install`