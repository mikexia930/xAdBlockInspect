export interface IFPopupConfig {
  isUse?: boolean;
  repeat?: {
    isUse: boolean;
    time: number;
  }; // 是否重复展示，用户关闭后会继续展示
  text?: string;
  styles?: {
    [key:string]: string | number;
  }
}

export interface IFButtonConfig {
  isUse?: boolean;
  text?: string;
  styles?: {
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

export interface EnumInspectConfig {
  popup?: IFPopupConfig;
  button?: IFButtonConfig;
}

export function adBlockInspect(
  elements: Partial<IFInspectElements>,
  config: EnumInspectConfig
) {
  function mergeObjects(target: any, source: any) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          mergeObjects(target[key], source[key]);
        } else {
          target[key] = source[key] || '';
        }
      }
    }
    return target;
  }
  // 设置 config
  let useConfig: EnumInspectConfig = {
    popup: {
      isUse: true,
      repeat: {
        isUse: true,
        time: 5000
      },
      text: '检测到存在广告屏蔽类插件，为了不影响您的正常访问，建议将本站加入白名单，并刷新页面。',
      styles: {
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: '10000',
        backgroundColor: 'rgba(255,72,72,0.95)',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '100%',
        fontSize: '16px',
        color: '#fff'
      }
    },
    button: {
      isUse: false,
      text: '知道了',
      styles: {
        marginLeft: '12px'
      },
    }
  }
  if (config) {
    useConfig = mergeObjects(useConfig, config);
  }

  let repeatTimeoutIns: any = null;
  function closePopup(popup: HTMLDivElement) {
    popup.style.display = 'none';
    if (useConfig?.popup?.repeat?.isUse) {
      if (repeatTimeoutIns) {
        clearTimeout(repeatTimeoutIns);
        repeatTimeoutIns = null;
      }
      repeatTimeoutIns = setTimeout(() => {
        popup.style.display = 'block';
      }, useConfig?.popup?.repeat?.time || 5000)
    }
  }

  function createPopupCloseBtn(popup: HTMLDivElement) {
    const closeButton: any = document.createElement('button');
    closeButton.classList.add('ad-block-inspect-popup-close-btn');
    closeButton.textContent = useConfig?.button?.text || 'Confirm';
    if (useConfig?.button?.styles && typeof useConfig?.button?.styles === 'object') {
      Object.keys(useConfig.button.styles).forEach(key => {
        closeButton.style[String(key)] = useConfig?.button?.styles?.[String(key)] || '';
      })
    }
    closeButton.onclick = () => {
      closePopup(popup)
    };
    return closeButton;
  }

  function createNoticeModal() {
    const popup: any = document.createElement('div');
    // 设置弹出窗的样式
    if (useConfig?.popup?.styles && typeof useConfig?.popup?.styles === 'object') {
      Object.keys(useConfig.popup.styles).forEach(key => {
        popup.style[String(key)] = useConfig?.popup?.styles?.[String(key)] || '';
      })
    }
    popup.classList.add('ad-block-inspect-popup');
    // 添加提示信息
    popup.innerHTML = useConfig?.popup?.text || 'No prompt text set';
    // 添加关闭按钮
    if (useConfig?.button?.isUse) {
      popup.appendChild(createPopupCloseBtn(popup));
    } else {
      popup.onclick = () => {
        closePopup(popup);
      };
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

  return new Promise((resolve) => {
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
      if (!testResult && useConfig?.popup?.isUse) {
        document.body.appendChild(createNoticeModal());
      }
      resolve(testResult);
    });
  })
}
