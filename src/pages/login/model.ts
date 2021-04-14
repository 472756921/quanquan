import { login } from './service';
import { history } from 'umi';
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface LoginModelState {
  name: string;
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    save: Reducer<LoginModelState>;
  };
  subscriptions: { setup: Subscription };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    user: '',
  },
  subscriptions: {},
  effects: {
    *login({ payload }, { put, call, select }) {
      const { data } = yield call(login, payload);
      if (data) {
        sessionStorage.setItem('Authorization', data ? data : '');
        history.push('/');
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default LoginModel;
