let token = '';
export const getToken = () => {
  if (token) return token;
  const value =
    localStorage.getItem('token') ?? sessionStorage.getItem('token');
  if (value) token = value;
  return token;
};

export const setToken = (value, remember) => {
  token = value;
  if (remember) {
    localStorage.setItem('token', value);
  } else {
    sessionStorage.setItem('token', value);
  }
};

export const removeToken = () => {
  token = '';
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userInfo');
};

export const isLogin = () => {
  return Boolean(getToken());
};
