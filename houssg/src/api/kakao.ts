const RedirectUri = 'http://localhost:5173/user';

export const KakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${
	import.meta.env.VITE_KAKAO_KEY
}&redirect_uri=${RedirectUri}&response_type=code`;
