class LoginObjectRep {
  /** 账号 */
  userInfo?: UserInfoObj;
  /** 密码 */
  token?: string;
}
class UserInfoObj {
  /** 账号 */
  username?: string;
  /** 昵称 */
  nickname?: string;
  /** 状态 */
  status?: boolean;
  /** 上次登录时间 */
  lastLoginDate?: string;
}

export const APIS = { LoginObjectRep, UserInfoObj };
