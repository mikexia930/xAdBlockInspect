export interface IFPopupConfig {
  text: string;
  style?: {
    [key:string]: string | number;
  }
}

export interface IFButtonConfig {
  isUse: boolean;
  text: string;
  style?: {
    [key:string]: string | number;
  }
}

export enum EnumInspectDomType {
  Tags = 'tags',
  Classnames = 'classnames',
  Ids = 'ids',
}

export interface IFInspectElements {
  images: string[],
  dom: {
    [EnumInspectDomType.Tags]: string[],
    [EnumInspectDomType.Classnames]: string[],
    [EnumInspectDomType.Ids]: string[]
  },
}

export interface IFInspectConfig {
  popup: IFPopupConfig;
  button: IFButtonConfig;
}

export function xAdBlockInspect(
  elements: Partial<IFInspectElements>,
  config: IFInspectConfig = {
    popup: {
      text: '检测到存在广告屏蔽类插件，为了不影响您的正常访问，建议将本站加入白名单，并刷新页面。'
    },
    button: {
      isUse: false,
      text: '知道了'
    }
  },
) {

  function createModalCloseBtn(modal: HTMLDivElement) {
    const closeButton: any = document.createElement('button');
    closeButton.textContent = config?.button?.text || 'Confirm';
    if (config?.button?.style && typeof config?.button?.style === 'object') {
      Object.keys(config.button.style).forEach(key => {
        closeButton.style[String(key)] = config.button.style?.[String(key)] || '';
      })
    }
    closeButton.onclick = function() {
      modal.style.display = 'none';
    };
    return closeButton;
  }

  function createNoticeModal() {
    const popup: any = document.createElement('div');
    // 设置弹出窗的样式
    popup.style.position = 'fixed';
    popup.style.left = '0';
    popup.style.top = '0';
    popup.style.zIndex = '10000';
    popup.style.backgroundColor = 'rgba(255,72,72,0.9)';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.style.textAlign = 'center';
    popup.style.width = '100%';
    popup.style.fontSize = '16px';
    popup.style.color = '#fff';

    if (config?.popup?.style && typeof config?.popup?.style === 'object') {
      Object.keys(config.popup.style).forEach(key => {
        popup.style[String(key)] = config.popup.style?.[String(key)] || '';
      })
    }
    // 添加提示信息
    popup.innerHTML = config?.popup?.text || 'No prompt text set';
    // 添加关闭按钮
    if (config.button.isUse) {
      popup.appendChild(createModalCloseBtn(popup));
    }
    return popup;
  }
  // 验证图片
  function testImage(image: string) {
    return new Promise((resolve, reject) => {
      const testAd = new Image();
      testAd.onload = function() {
        resolve(true);
      };
      testAd.onerror = function(error) {
        reject(error);
      };
      testAd.src = image;
    })
  }

  async function testImages(images: string[]) {
    let isValid = true;
    for (const image of images) {
      await testImage(image).then(() => {
        isValid = true;
      }).catch(() => {
        isValid = false;
      })
      if (isValid) break;
    }
    return isValid;
  }

  // 验证 dom
  function testDom(type: EnumInspectDomType, dom: string) {
    return new Promise((resolve, reject) => {
      let isExists = false;
      if (type === EnumInspectDomType.Ids) {
        isExists = !!document.getElementById(dom)
      } else if (type === EnumInspectDomType.Tags) {
        isExists = !!document.getElementsByTagName(dom)
      } else if (type === EnumInspectDomType.Classnames) {
        isExists = !!document.getElementsByClassName(dom)
      }
      if (isExists) {
        resolve(true);
      } else {
        reject(false);
      }
    })
  }

  async function testDoms(type: EnumInspectDomType, doms: string[]) {
    let isValid = true;
    for (const dom of doms) {
      await testDom(type, dom).then(() => {
        isValid = true;
      }).catch(() => {
        isValid = false;
      })
      if (isValid) break;
    }
    return isValid;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    let testResult = true;
    if (testResult && elements.hasOwnProperty('images') && elements.images && elements.images.length > 0) {
      testResult = await testImages(elements.images);
    }
    if (testResult && elements.hasOwnProperty('dom') && elements.dom) {
      if (testResult && elements['dom'].hasOwnProperty(EnumInspectDomType.Tags)) {
        testResult = await testDoms(EnumInspectDomType.Tags, elements.dom[EnumInspectDomType.Tags]);
      }
      if (testResult && elements['dom'].hasOwnProperty(EnumInspectDomType.Classnames)) {
        testResult = await testDoms(EnumInspectDomType.Classnames, elements.dom[EnumInspectDomType.Classnames]);
      }
      if (testResult && elements['dom'].hasOwnProperty(EnumInspectDomType.Ids)) {
        testResult = await testDoms(EnumInspectDomType.Ids, elements.dom[EnumInspectDomType.Ids]);
      }
    }
    if (!testResult) {
      document.body.appendChild(createNoticeModal());
    }
  });
}
