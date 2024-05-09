import { xAdBlockInspect } from '../packages/xAdBlockInspect/src/index';

xAdBlockInspect({
  images: ['https://static.tapdb.net/home_page/res/img/2018/coffee.png']
}).then((passed: boolean) => {
  const domDiv = document.createElement('div');
  domDiv.style.paddingTop = '300px'
  domDiv.style.textAlign = 'center'
  if (passed) {
    domDiv.style.color = 'green'
    domDiv.innerHTML = '未检测到有元素被 AdBlock 阻止'
  } else {
    domDiv.style.color = 'red'
    domDiv.innerHTML = '检测到有元素已被 AdBlock 阻止'
  }
  document.body.appendChild(domDiv);
})

