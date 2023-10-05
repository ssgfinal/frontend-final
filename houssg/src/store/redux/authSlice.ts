import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { authUrl } from '../../assets/constant';
import { RootState } from '.';
import { isAxiosError } from 'axios';

export interface authState {
	nickname: '';
	isLogin: boolean;
	status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: authState = {
	nickname: '',
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

			console.log(data);
			// TODO:nickname
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
		checkLogin: (state, action) => {
			state.isLogin = true;
			state.nickname = action.payload.nickname;
		},
		checkLogout: (state) => {
			state.isLogin = false;
			sessionStorage.removeItem('authorization');
			sessionStorage.removeItem('refreshtoken');
			sessionStorage.removeItem('nickname');
			sessionStorage.removeItem('phone');
		},
		resetAuthStatus: (state) => {
			state.status = 'idle';
			console.log('호출됐나');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(__postLogin.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(__postLogin.fulfilled, (state, action) => {
				state.status = 'success';
				state.isLogin = true;
				//TODO: 고칠듯
				state.nickname = action.payload.nickname ? action.payload.nickname : '';
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
const myNickname = (state: RootState) => state.auth.nickname;

export { __postLogin, __postSignUp };
export { authStatus, isLoginState, myNickname };
export const { checkLogin, checkLogout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
