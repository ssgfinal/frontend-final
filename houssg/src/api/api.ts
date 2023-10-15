import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}`,
	timeout: 100000,
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<{ headers: string }>) => {
	const access_token = sessionStorage.getItem('authorization');

	if (access_token !== null) {
		config.headers['Authorization'] = access_token;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status) {
			switch (error.response.status) {
				case 500:
					alert('서버에 문제가 있습니다.');
					break;
				default:
					return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);
export default api;
