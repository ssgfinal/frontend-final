import { useLocation } from 'react-router-dom';

export const usePathname = () => {
	const location = useLocation(); // 현재 URL 정보 가져오기

	return location.pathname;
};
