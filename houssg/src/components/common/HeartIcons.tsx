import { styled } from 'styled-components';
import { HeartIcon, FullHeartIcon } from '../../assets/icons/index';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';
import { isLoginState } from '../../store/redux/authSlice';

interface HeartIconsProps {
	houseId: number;
}
const HeartIcons: React.FC<HeartIconsProps> = ({ houseId }) => {
	const [isLike, setIsLike] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const isLogin = useAppSelector(isLoginState);

	useEffect(() => {
		if (isLogin) {
			try {
				api.get(userUrl.like, { params: { accomNumber: houseId } }).then(({ data }) => {
					setIsLike(data);
				});
			} catch (err) {
				console.log('라이크 첫 렌더링 시 로그인 상태면 실행되는 get 리스펀스 > ', err);
			}
		}
	}, []);

	useEffect(() => {
		if (isLogin) {
			api.get(userUrl.like, { params: { accomNumber: houseId } }).then(({ data }) => {
				setIsLike(data);
			});
		} else {
			setIsLike(false);
		}
	}, [isLogin]);

	const HeartClick = () => {
		if (!isLogin) {
			const modalSize = window.innerWidth >= 1000 ? 500 : 400;
			dispatch(openModal({ modalComponent: 'auth', modalSize: modalSize }));
		} else {
			if (isLike) {
				// 찜 o -> 찜 X 로 된 경우
				// 아직 변경된 isLike가 반영이 안 되서 true인 상태
				try {
					api.delete(userUrl.like, { params: { accomNumber: houseId } }).then(({ data }) => {
						console.log('찜 해제 api 통신 성공 > ', data);
					});
				} catch (err) {
					console.log('찜 해제 api 에러 > ', err);
				}
			} else {
				// 찜 X -> 찜 o 로 된 경우
				// 아직 변경된 isLike가 반영이 안 되서 false인 상태
				try {
					api.post(userUrl.like, null, { params: { accomNumber: houseId } }).then(({ data }) => {
						console.log('찜 하기 api 통신 성공 > ', data);
					});
				} catch (err) {
					console.log('찜 하기 api 에러 > ', err);
				}
			}
			setIsLike(!isLike);
		}
	};

	return <HeartImg onClick={HeartClick} src={isLike ? FullHeartIcon : HeartIcon} />;
};

export default HeartIcons;

const HeartImg = styled.img`
	width: 100%;
	height: 100%;
`;
