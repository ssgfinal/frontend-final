import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 100000,
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<{ headers: string }>) => {
	const access_token = sessionStorage.getItem('authorization');

	// config.headers 초기화
	config.headers = config.headers || {};
	if (access_token !== null) {
		config.headers['Authorization'] = `${access_token}`;
	}
	return config;
});

export default api;
