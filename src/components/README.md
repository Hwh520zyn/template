# 商业组件使用说明

1. 在 entries 文件夹下新建文件，创建路由页面

2. 在新建页面的 html 文件中添加要引入组件的模版，例如：

```html
${require('@/components/example/index.html')}
```

3. 在新建页面 js 文件中引入组件的 js 文件，例如：

```js
import '@/components/example'
```

# 商业组件开发说明

### css 变量说明

[查看 var.less 文件](../componentsCss/common/var.less)

### 公用 className 说明

[查看 public.less 文件](../componentsCss/common/public.less)

### less mixins 说明

`mixins` 添加需要加`()`, 不加括号会导致在全局添加多余的 `className`

正确示范：

```less
.display-block() {
  display: block;
}
```

错误示范：

```less
.display-block {
  display: block;
}
```
