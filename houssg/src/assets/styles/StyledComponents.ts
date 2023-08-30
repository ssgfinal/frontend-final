import styled from 'styled-components';

import { color } from '.';
import { HeightProps } from '../../types/common';

export const AuthTitle = styled.div`
	width: 100%;
	padding: 0.5rem;
	font-size: 2rem;
	font-weight: 800;
	color: ${color.color2};
	text-align: center;
	height: 4rem;
`;

export const AuthContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const HeightPositioningDiv = styled.div<HeightProps>`
	height: ${(props) => props.height};
`;
