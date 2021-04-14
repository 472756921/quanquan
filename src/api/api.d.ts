declare namespace APIS {
  export class LoginObjectRep {
    /** 账号 */
    userInfo?: UserInfoObj;
    /** 密码 */
    token?: string;
  }
  export class UserInfoObj {
    /** 账号 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 状态 */
    status?: boolean;
    /** 上次登录时间 */
    lastLoginDate?: string;
  }
}

declare namespace APIS {
  /**
   * System 系统接口
   */
  export namespace System {
    /**
     * 登录接口
     * /system/login
     */
    export namespace Login {
      export class Params {
        /** 账号 */
        username?: string;
        /** 密码 */
        password?: string;
        /** 记住 */
        remember?: boolean;
      }

      export type Response = defs.APIS.LoginObjectRep;
      export const init: Response;
      export function request(
        params: Params,
      ): Promise<defs.APIS.LoginObjectRep>;
    }
  }
}
