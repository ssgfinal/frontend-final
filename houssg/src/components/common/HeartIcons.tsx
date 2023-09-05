import { styled } from 'styled-components';
import { HeartIcon, FullHeartIcon } from '../../assets/icons/index';
import { useState } from 'react';

interface Props {
	favorite: boolean;
}

const HeartIcons: React.FC<Props> = ({ favorite }) => {
	const [heartSrc, setHeartSrc] = useState<string>(favorite ? FullHeartIcon : HeartIcon);

	const HeartClick = () => {
		setHeartSrc((prevHeartSrc) => (prevHeartSrc === HeartIcon ? FullHeartIcon : HeartIcon));
	};

	return <HeartImg onClick={HeartClick} src={heartSrc} />;
};

export default HeartIcons;

const HeartImg = styled.img`
	width: 1rem;
`;
