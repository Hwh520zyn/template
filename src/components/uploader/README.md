# 文件上传组件

## 依赖

1. [@dxy/file-upload-sdk](http://npm.dxy.net/package/@dxy/file-upload-sdk)

## 使用示例

```javascript
import Uploader from '@/components/uploader'
// or
// import { Uploader } from '@/components/uploader'

new Uploader({
  container: '#uploader-image',
  accept: 'image/*',
  multiple: true
})
```

### 配置

- `container`: 此组件的Dom容器选择器。example: `#file-uploader`;
- `accept`: 接收的文件类型，默认值：`image/*`,多值用逗号隔开，可选择的类型[MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types);
- `multiple`: 是否可以选择多个文件，默认值：`false`;
- `syncUpload`: 是否同步上传文件（按顺序一个个文件上传），默认值：`false`;
- `single`: 是否只能上传一个文件，默认值：`false`;
- `files`: 默认的已经上传过的文件列表，类型: `array[object]`，其中file对象必须要有 `name` 字段;
- `onSuccess`: 上传成功时的回调;
- `beforeDelete`: 删除文件前的钩子函数，可以是个`promise`函数，通过`reject`来阻止删除;
- `onDelete`: 删除文件后的回调;
- `uploadConfig`: 其他文件上传SDK的配置，具体请看[SDK项目地址](http://gitlab.dxy.net/f2e/file-upload-sdk);
