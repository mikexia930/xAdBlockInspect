# x-ad-block-inspect
>
>检测页面是否有元素被 AdBlock 之类的插件阻止，并提示用户，可以自定义提示。
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
xAdBlockInspect(elements, config).then((passed: boolean) => {
    passed = true 为没有被阻止，false 为被阻止
})
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
    isUse: boolean, // 是否使用插件自带的弹窗提示
    text: '', // 提示内容
    style: {} // 样式对象，此参数非必须，不填为默认
  },
  button: {
    isUse: boolean, // 弹窗是否使用 关闭按钮
    text: '', // 按钮中显示的内容
    style: {} // 样式对象，此参数非必须，不填为默认
  }
}
```
