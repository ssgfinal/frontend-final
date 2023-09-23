const RedirectUri = import.meta.env.VITE_MY_URL;

export const KakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${
	import.meta.env.VITE_KAKAO_KEY
}&redirect_uri=${RedirectUri}&response_type=code`;
