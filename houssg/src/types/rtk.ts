import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

// AuthLoginFunc 타입을 정의합니다.
interface AuthLoginFunc {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(userId: string, userPw: string, dispatch: ThunkDispatch<any, undefined, AnyAction>, __postLogin: any): void;
}

export type { AuthLoginFunc };
