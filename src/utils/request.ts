import { stringifyQuery } from '../utils';
import history from '../history';
import { getToken, removeToken } from '../utils/auth';
import { message } from 'antd';

export const urlPreff = '/api/v1/';
async function request(options) {
  let url = urlPreff + options.url;
  const init = {
    headers: {
      Authorization: `${getToken()}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      ...options.config?.headers,
    },
  };
  if (options.method === 'GET') {
    init.headers['Content-Type'] = 'charset=utf-8';
    if (options.data) url += stringifyQuery(options.data);
  } else {
    init.method = options.method;
    init.headers['Content-Type'] = 'application/json;charset=utf-8';
    if (options.data) {
      init.body = JSON.stringify(options.data);
    }
  }

  const response = await fetch(url, init);

  if (
    response?.headers
      .get('content-type')
      ?.toLowerCase()
      .includes('application/json')
  ) {
    const res = await response?.json();

    if (res?.code !== 200) {
      message.error(res?.message || '未知原因');
    }

    if (res?.code === 401) {
      removeToken();
      history.push('/login');
      return '';
    } else {
      return res;
    }
  } else {
    if (response?.ok) {
      return response;
    }
    message.error('服务器出错');

    // throw response;
  }
}

export function get(url, data, config) {
  return request({ url, data, config, method: 'GET' });
}

export function post(url, data, config) {
  return request({ url, data, config, method: 'POST' });
}

export function put(url, data, config) {
  return request({ url, data, config, method: 'PUT' });
}

export function patch(url, data, config) {
  return request({ url, data, config, method: 'PATCH' });
}

export function del(url, data, config) {
  return request({ url, data, config, method: 'DELETE' });
}
