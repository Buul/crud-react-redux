export const urlParamsToObj = () => {
  const url = decodeURIComponent(window.location.href);
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  const obj = {};
  if (queryString) {
    // eslint-disable-next-line prefer-destructuring
    queryString = queryString.split('#')[0];

    const arr = queryString.split('&');

    for (let i = 0; i < arr.length; i += 1) {
      const a = arr[i].split('=');

      const paramName = a[0];
      const paramValue = typeof a[1] === 'undefined' ? true : a[1];

      if (paramName.match(/\[(\d+)?\]$/)) {
        const key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          const index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else if (!obj[paramName]) {
        obj[paramName] = paramValue;
      } else if (obj[paramName] && typeof obj[paramName] === 'string') {
        obj[paramName] = [obj[paramName]];
        obj[paramName].push(paramValue);
      } else {
        obj[paramName].push(paramValue);
      }
    }
  }
  return obj;
};

export default urlParamsToObj;
