import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
	baseURL: 'http://10.10.10.96:3200/',
	//TODO: 보근님꺼
	// baseURL: 'http://10.10.10.120:3100/',
	timeout: 100000,
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<{ headers: string }>) => {
	const access_token = sessionStorage.getItem('authorization');
	console.log(access_token);
	// // config.headers 초기화
	// config.headers = config.headers || {};
	if (access_token !== null) {
		config.headers['Authorization'] = `${access_token}`;
	}
	return config;
});

export default api;
