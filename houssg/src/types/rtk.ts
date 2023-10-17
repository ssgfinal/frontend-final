// dispatch 타입을 위한 허용
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

type ReduxDispathType = ThunkDispatch<any, undefined, AnyAction>;

interface AuthLoginFunc {
	(userId: string, userPw: string, dispatch: ReduxDispathType, __postLogin: any): void;
}

interface AuthSignUpFunc {
	(userId: string, userNick: string, userPw: string, userPwCheck: string, userPhone: string, dispatch: ReduxDispathType, __postSignUp: any): void;
}
export type { AuthLoginFunc, AuthSignUpFunc };
