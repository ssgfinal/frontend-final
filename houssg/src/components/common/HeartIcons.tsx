import { styled } from 'styled-components';
import { HeartIcon, FullHeartIcon } from '../../assets/icons/index';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openModal } from '../../store/redux/modalSlice';
import api from '../../api/api';
import { userUrl } from '../../assets/constant';
import { isLoginState } from '../../store/redux/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { houseDetailDelete, houseDetailLike } from '../../helper';
import { userKey } from '../../assets/constant/queryKey';

interface HeartIconsProps {
	houseId: number;
	beforePage: string;
}
const HeartIcons: React.FC<HeartIconsProps> = ({ houseId, beforePage }) => {
	const [isLike, setIsLike] = useState<boolean>(beforePage === 'houseDetail' ? false : true);

	const dispatch = useAppDispatch();
	const isLogin = useAppSelector(isLoginState);

	const queryClient = useQueryClient();

	const like = useMutation({
		mutationFn: (houseId: number) => houseDetailLike(houseId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myFavorite] });
		},
	});

	const likeDelete = useMutation({
		mutationFn: (houseId: number) => houseDetailDelete(houseId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userKey.myFavorite] });
		},
	});

	useEffect(() => {
		if (isLogin) {
			if (beforePage === 'houseDetail') {
				try {
					api.get(userUrl.like, { params: { accomNumber: houseId } }).then(({ data }) => {
						setIsLike(data);
					});
				} catch (err) {
					console.log('라이크 첫 렌더링 시 로그인 상태면 실행되는 get 리스펀스 > ', err);
				}
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
				likeDelete.mutate(houseId);
			} else {
				// 찜 X -> 찜 o 로 된 경우
				// 아직 변경된 isLike가 반영이 안 되서 false인 상태
				like.mutate(houseId);
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
