import { methods } from '../../api';

export function login(data) {
  return methods.system.login.request(data);
}
