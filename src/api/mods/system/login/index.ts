import {
  get,
  post,
  put,
  del,
  patch,
  urlPreff,
} from '../../../../utils/request';

class LoginObjectReq {
  username = '';
  password = '';
  remember = '';
}

/**
 * @description 登录接口
 */
export function request(params = {}) {
  return post('system/login', params);
}
