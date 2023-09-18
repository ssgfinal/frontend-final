import { styled } from 'styled-components';

import MyPage from '../../components/usermypages/MyPage';
import { useEffect, useState } from 'react';

const mypagemain = [
	{
		userId: 'abc',
		userNickName: '홍길동',
		userPoint: 1000,
	},
];

const UserMypage = () => {
	const [mypage, setMypage] = useState(mypagemain);

	const Server = async () => {
		try {
			const response = mypage;
			//await fetch('http://localhost:3200/');
			const data = response;
			// await response.json();
			setMypage(data);
		} catch (error) {
			console.error('데이터를 불러오는 데 실패했습니다.', error);
		}
	};

	useEffect(() => {
		Server();
		// TODO: 서버 연결 후 수정
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MyPageWrapper>
			{mypagemain.map((mypageItem, index) => (
				<div key={index}>
					<MyPage mypagemain={mypageItem} />
				</div>
			))}
		</MyPageWrapper>
	);
};

export default UserMypage;

const MyPageWrapper = styled.div`
	width: 100%;

	@media (min-width: 1400px) {
		width: 100%;
	}

	@media (min-width: 1200px) and (max-width: 1400px) {
		width: 100%;
	}

	@media (min-width: 700px) and (max-width: 1200px) {
		width: 100%;
	}

	@media (max-width: 700px) {
		width: 100vw;
	}
`;
