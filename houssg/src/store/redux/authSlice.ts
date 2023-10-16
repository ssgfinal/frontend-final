import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { authUrl } from '../../assets/constant';
import { RootState } from '.';
import { isAxiosError } from 'axios';

export interface authState {
	isLogin: boolean;
	status: 'idle' | 'loading' | 'failed' | 'success';
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
		if (isAxiosError(error) && error.request.status === 404) {
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
				// state.status = 'failed';
				state.status = 'success';
			});
	},
});
const authStatus = (state: RootState) => state.auth.status;
const isLoginState = (state: RootState) => state.auth.isLogin;

export { __postLogin, __postSignUp };
export { authStatus, isLoginState };
export const { checkLogin, checkLogout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
