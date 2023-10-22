import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { authUrl } from '../../assets/constant';
import { RootState } from '.';
import { isAxiosError } from 'axios';

export interface authState {
	isLogin: boolean;
	status: 'idle' | 'loading' | 'failed' | 'success' | 'kakao';
}

const initialState: authState = {
	isLogin: false,
	status: 'idle',
};

const __postLogin = createAsyncThunk('POST_LOGIN', async (payload: { id: string; password: string }, thunkAPI) => {
	try {
		const { data, status, headers } = await api.post(authUrl.login, payload);

		if (status === 200) {
			sessionStorage.setItem('authorization', headers.authorization);
			sessionStorage.setItem('refreshtoken', headers.refreshtoken);
			sessionStorage.setItem('nickname', data.nickname);
			sessionStorage.setItem('phone', data.phone);
			sessionStorage.setItem('point', data.point);
		}
		return thunkAPI.fulfillWithValue(data);
	} catch (error) {
		if (isAxiosError(error) && error.request.status === 400) {
			alert('아이디와 패스워드를 확인해주세요');
		}
		return thunkAPI.rejectWithValue('에러');
	}
});

const __postSignUp = createAsyncThunk('POST_SIGNUP', async (payload, thunkAPI) => {
	try {
		const data = await api.post(authUrl.signUp, payload);
		if (data.status === 200) {
			alert('회원가입 되었습니다.');
		}
		return thunkAPI.fulfillWithValue(data.data);
	} catch (error) {
		if (isAxiosError(error) && error.request.status === 403) {
			alert('중복확인 부탁드립니다.');
		}
		return thunkAPI.rejectWithValue('에러');
	}
});

const __postKaKaoLogin = createAsyncThunk('POST_KAKAO_LOGIN', async (payload: { code: string }, thunkAPI) => {
	try {
		const { data, status, headers } = await api.post(authUrl.kakaoLogin, null, { params: payload });

		if (status >= 200 && status < 300 && data.nickname) {
			sessionStorage.setItem('authorization', headers.authorization);
			sessionStorage.setItem('refreshtoken', headers.refreshtoken);
			sessionStorage.setItem('nickname', data.nickname);
			sessionStorage.setItem('phone', data.phonenumber);
			sessionStorage.setItem('point', data.point);
			window.location.href = '/';

			return thunkAPI.fulfillWithValue({ login: true });
		} else {
			sessionStorage.setItem('kakao', headers.authorization);
			sessionStorage.setItem('refreshtoken', headers.refreshtoken);

			return thunkAPI.fulfillWithValue({ login: false });
		}
	} catch (error) {
		if (isAxiosError(error) && error.request.status === 400) {
			alert('카카오 로그인을 재 시도해 주세요');
		} else if (isAxiosError(error) && error.request.status !== 500) {
			alert('실패');
		}
		window.location.href = '/';

		return thunkAPI.rejectWithValue('에러');
	}
});

const __postKaKaoSignUp = createAsyncThunk('POST_KAKAO_SIGNUP', async (payload: { phonenumber: string; nickname: string }, thunkAPI) => {
	try {
		const access_token = sessionStorage.getItem('kakao');
		const { data, status } = await api.post(authUrl.kakaoAdd, null, { params: payload, headers: { Authorization: access_token } });
		if (status === 200 && access_token) {
			alert('회원가입 되었습니다.');
			access_token && sessionStorage.setItem('authorization', access_token);
			sessionStorage.removeItem('kakao');
			sessionStorage.setItem('nickname', data.nickname);
			sessionStorage.setItem('phone', data.phonenumber);
			sessionStorage.setItem('point', data.point);
		}
		return thunkAPI.fulfillWithValue(data.data);
	} catch (error) {
		if (isAxiosError(error) && error.request.status === 403) {
			alert('중복확인 부탁드립니다.');
		} else if (isAxiosError(error) && error.request.status >= 400 && error.request.status < 500) {
			alert('실패하였습니다.');
		}
		return thunkAPI.rejectWithValue('에러');
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		checkLogin: (state) => {
			state.isLogin = true;
		},
		checkLogout: (state) => {
			state.isLogin = false;
			sessionStorage.removeItem('authorization');
			sessionStorage.removeItem('refreshtoken');
			sessionStorage.removeItem('nickname');
			sessionStorage.removeItem('phone');
			sessionStorage.removeItem('point');
		},
		resetAuthStatus: (state) => {
			state.status = 'idle';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(__postLogin.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(__postLogin.fulfilled, (state) => {
				state.status = 'success';
				state.isLogin = true;
			})
			.addCase(__postLogin.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(__postSignUp.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(__postSignUp.fulfilled, (state) => {
				state.status = 'success';
			})
			.addCase(__postSignUp.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(__postKaKaoLogin.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(__postKaKaoLogin.fulfilled, (state, action) => {
				state.status = action.payload.login ? 'success' : 'kakao';
				state.isLogin = action.payload.login;
			})
			.addCase(__postKaKaoLogin.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(__postKaKaoSignUp.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(__postKaKaoSignUp.fulfilled, (state) => {
				state.status = 'success';
				state.isLogin = true;
			})
			.addCase(__postKaKaoSignUp.rejected, (state) => {
				state.status = 'failed';
			});
	},
});
const authStatus = (state: RootState) => state.auth.status;
const isLoginState = (state: RootState) => state.auth.isLogin;

export { __postLogin, __postSignUp, __postKaKaoLogin, __postKaKaoSignUp };
export { authStatus, isLoginState };
export const { checkLogin, checkLogout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
