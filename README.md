# koa2-image-upload

koa2 middle to upload file

### Features

- support upload to dir

```javascript
options['upload'] = {
  "url": '/api/upload',
  "mimetypes": ['image/png','image/bmp'], // 如果没有配置,将不进行类型检查 https://www.sitepoint.com/web-foundations/mime-types-complete-list/
  "folder": "public",
  "urlPath": "images"
}
```

- support upload to oss

```javascript
options["upload"] = {
  "url": '/api/upload',
  "mimetypes": ['image/png','image/bmp'],
  "accessKeyId": "key",
  "accessKeySecret": "secret",
  "bucket": "terminus-designer",
  "region": "oss-cn-hangzhou"
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