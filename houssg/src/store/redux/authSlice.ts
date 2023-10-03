import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { authUrl } from '../../assets/constant';
import { RootState } from '.';

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

export const __postLogin = createAsyncThunk('POST_LOGIN', async (payload: { id: string; password: string }, thunkAPI) => {
	try {
		const data = await api.post(authUrl.login, payload);

		if (data.status === 200) {
			sessionStorage.setItem('authorization', data.headers.authorization);
			sessionStorage.setItem('RefreshToken', data.headers['refreshtoken']);
			// TODO:nickname
		}
		return thunkAPI.fulfillWithValue(data.data);
	} catch (error) {
		alert('아이디와 패스워드를 확인해주세요');
	}
});

// export const __postMember = createAsyncThunk('POST_SIGNUP', async (payload, thunkAPI) => {
// 	try {
// 		const { data } = await http.post('/members/join', payload);
// 		return thunkAPI.fulfillWithValue(data);
// 	} catch (error) {
// 		console.log(error);
// 		if (error.response.status === 404) {
// 			alert('작성 조건을 지켜주세요.');
// 		}
// 		return thunkAPI.rejectWithValue(error);
// 	}
// });

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
			.addCase(__postLogin.fulfilled, (state, action) => {
				state.status = 'idle';
				state.isLogin = true;
				//TODO: 고칠듯
				state.nickname = action.payload.nickname ? action.payload.nickname : '';
			})
			.addCase(__postLogin.rejected, (state) => {
				state.status = 'failed';
			});
	},
});
const authStatus = (state: RootState) => state.auth.status;
const isLoginState = (state: RootState) => state.auth.isLogin;
const myNickname = (state: RootState) => state.auth.nickname;

export { authStatus, isLoginState, myNickname };
export const { checkLogin, checkLogout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
