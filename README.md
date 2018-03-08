# koa2-file-upload

[![](https://img.shields.io/npm/v/koa2-file-upload.svg?style=flat)](https://www.npmjs.com/package/koa2-file-upload)

koa2 middle to upload file, 支持文件系统、 阿里 oss 、腾讯 cos 、华为 obs 、azure

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
  "filename": (file) => `${new Date().getTime()}-${file.filename}`, // default null
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

- support upload to obs

```javascript
options["upload"] = {
  "url": '/api/upload',
  "provider": "obs",
  "bucket": "****",
  "accessKeyId": "****",
  "accessKeySecret": "****",
  "server": "****"
}
```

- support upload to azure

```javascript
options["upload"] = {
  "url": '/api/upload',
  "provider": "azure", 
  "container": "xxxx",
  "account": "xxxx",
  "connectionString": "xxxx",
}
```

- support upload to aws

```javascript
options["upload"] = {
  "url": '/api/upload',
  "endpoint": "http://localhost:801",
  "provider": "aws", 
  "bucket": "****",
  "accessKeyId": "****",
  "secretAccessKey": "****",
  "s3ForcePathStyle": true, // minio support
  "signatureVersion": "v4" // minio support
}
```


### How to use

```javascript

npm i koa2-file-upload

app.use(uploader(options))
```

### Requirements

- Node v6.0+

## Workflow

- `npm install`
