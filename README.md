# x-ad-block-inspect
>
>检测页面是否有元素被 AdBlock 之类的插件阻止，并提示用户。
>
[Demo](https://mikexia930.github.io/xAdBlockInspect/)
## 版本
- v1.0.0

## 使用
```
npm install x-ad-block-inspect
```
或直接用引入
```
<script src="XAdBlockInspect/lib/x-ad-block-inspect.umd.js"></script>
```
## 示例
```
xAdBlockInspect(elements, config)
```

### 参数说明

#### elements
只需填写需要检测的元素即可。
```
{
    images: [],
    dom: {
        tags: [],
        classnames: [],
        ids: []
    }
}
```
#### config
```
{
  popup: {
    text: '', // 提示内容
    style: {} // 样式对象，此参数非必须，不填为默认
  },
  button: {
    isUse: boolean, // 是否使用 关闭按钮
    text: '', // 按钮中显示的内容
    style: {} // 样式对象，此参数非必须，不填为默认
  }
}
```
