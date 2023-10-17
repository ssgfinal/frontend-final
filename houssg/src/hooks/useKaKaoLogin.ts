import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useKakaoLogin = () => {
	const location = useLocation();
	const code = location.search.split('=')[1];

	useEffect(() => {
		// 만약 정보가 없으면 카카오 회원가입
		// console.log(code);
		// 그냥 사용
	}, [code]);

	return null; // 또는 필요에 따라 빈 요소나 컴포넌트를 반환할 수 있습니다.
};
