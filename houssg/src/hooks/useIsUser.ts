import { usePathname } from '.';

export const useIsUser = () => {
	const pathname = usePathname(); // 현재 URL 정보 가져오기
	const isUser = !pathname.startsWith('/owner');
	return isUser;
};
