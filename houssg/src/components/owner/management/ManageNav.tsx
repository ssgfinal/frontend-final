import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
interface ManageNavProps {
	setSelectedNav: React.Dispatch<React.SetStateAction<string>>;
}

const ManageNav: React.FC<ManageNavProps> = ({ setSelectedNav }) => {
	const [currentNav, setCurrentNav] = useState('객실정보');
	useEffect(() => {
		setSelectedNav(currentNav);
	}, [currentNav]);
	return (
		<HouseInfoDetailNav>
			<div onClick={() => setCurrentNav('객실정보')}>객실 정보</div>
			<div>리뷰 확인</div>
			<div>객실 추가하기</div>
			<div>수정 및 삭제</div>
		</HouseInfoDetailNav>
	);
};

export default ManageNav;

const HouseInfoDetailNav = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 0.5rem;
`;
