import { expression } from '../config/enum';

export function parseQuery(str) {
  const obj = {};
  str
    .replace(/^\?/, '')
    .split('&')
    .forEach((item) => {
      if (!item) return;
      const [key, value] = item.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  return obj;
}

export function stringifyQuery(obj) {
  let str = '';
  Object.keys(obj).forEach((key) => {
    str = `${str}&${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
  });
  if (str) {
    str = str.replace(/^&/, '?');
  }

  return str;
}

export function matchFormate(data) {
  return JSON.stringify(data).replace(/[\r\n]/g, '');
}

export const uaMatch = () => {
  const userAgent = navigator.userAgent,
    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    rFirefox = /(firefox)\/([\w.]+)/,
    rOpera = /(opera).+version\/([\w.]+)/,
    rChrome = /(chrome)\/([\w.]+)/,
    rSafari = /version\/([\w.]+).*(safari)/;

  const ua = userAgent.toLowerCase();

  let match = rMsie.exec(ua);
  if (match != null) {
    return { browser: 'IE', version: match[2] || '0' };
  }
  match = rFirefox.exec(ua);
  if (match != null) {
    return { browser: match[1] || '', version: match[2] || '0' };
  }
  match = rOpera.exec(ua);
  if (match != null) {
    return { browser: match[1] || '', version: match[2] || '0' };
  }
  match = rChrome.exec(ua);
  if (match != null) {
    return { browser: match[1] || '', version: match[2] || '0' };
  }
  match = rSafari.exec(ua);
  if (match != null) {
    return { browser: match[2] || '', version: match[1] || '0' };
  }
  if (match != null) {
    return { browser: '', version: '0' };
  }
};
