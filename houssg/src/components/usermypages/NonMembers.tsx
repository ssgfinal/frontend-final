import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NonMembers = () => {
	const navigate = useNavigate();

	useEffect(() => {
		alert('로그인이 필요한 서비스입니다.');
		navigate(`/user`);
	});

	return <div></div>;
};

export default NonMembers;
