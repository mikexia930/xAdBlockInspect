# x-ad-block-inspect
>
>检测页面是否有元素被 AdBlock 之类的插件阻止，并提示用户，可以自定义提示。
>
[Demo](https://mikexia930.github.io/xAdBlockInspect/)
## 版本
- v1.0.3

## 使用
```
npm install x-ad-block-inspect
```

## 示例
```
adBlockInspect(elements, config).then((passed: boolean) => {
    passed = true 为没有被阻止，false 为被阻止
})
```

或直接用引入
```
<script src="XAdBlockInspect/lib/x-ad-block-inspect.umd.js"></script>
```
## 示例
```
window.XAdBlockInspect.adBlockInspect(elements, config).then((passed: boolean) => {
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
    isUse: true, // 是否使用插件自带的弹窗提示。默认显示
    text: '', // 提示内容
    repeat?: {
        isUse: true; // 是否开启被关闭后，重新打开。默认重新打开
        time: 5000;  // 单位 毫秒，重新打开时间。默认 5 秒
    };
    styles: {} // 样式对象，此参数非必须，不填为默认
  },
  button: {
    isUse: false, // 弹窗是否使用 关闭按钮。默认不显示
    text: '', // 按钮中显示的内容
    styles: {} // 样式对象，此参数非必须，不填为默认
  }
}
```

### 样式
会暴露两个 class
* popup 的是 ad-block-inspect-popup
* close-button 的是 ad-block-inspect-popup-close-btn
