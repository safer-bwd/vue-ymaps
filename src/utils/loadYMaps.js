const scriptId = `ymaps-api-${Date.now()}`;

const attachScript = (src) => {
  const elem = document.getElementById(scriptId);
  if (elem) {
    document.body.removeChild(elem);
  }

  const newElem = document.createElement('script');
  newElem.setAttribute('id', scriptId);
  newElem.setAttribute('src', src);
  newElem.setAttribute('async', '');
  newElem.setAttribute('defer', '');
  document.body.appendChild(newElem);

  return newElem;
};

export default (options = {}) => {
  if (!window) {
    throw new Error('Unable to load Yandex.Maps on server-side');
  }

  const {
    apikey = '',
    version = '2.1',
    lang = 'ru_Ru',
    mode = 'release',
    ns = 'ymaps',
    modules = 'package.full',
    url = 'https://api-maps.yandex.ru'
  } = options;

  let src = `${url}/${version}/?load=${modules}&lang=${lang}&mode=${mode}&ns=${ns}`;
  if (apikey) {
    src += `&apikey=${apikey}`;
  }

  const script = attachScript(src);

  return new Promise((resolve, reject) => {
    const errorHandler = () => {
      removeScriptEvent();
      reject(new Error('Failed to load Yandex.Maps'));
    };

    const loadHandler = () => {
      removeScriptEvent();

      if (!window[ns]) {
        reject(new Error('Failed to load Yandex.Maps'));
        return;
      }

      window[ns].ready(() => resolve(window[ns]),
        err => reject(err));
    };

    const removeScriptEvent = () => {
      script.removeEventListener('error', errorHandler);
      script.removeEventListener('load', loadHandler);
    };

    script.addEventListener('error', errorHandler);
    script.addEventListener('load', loadHandler);
  });
};
