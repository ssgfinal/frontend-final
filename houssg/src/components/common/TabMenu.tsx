import { color } from '../../assets/styles/theme';
import { styled } from 'styled-components';

interface TabMenuProps {
	tabObj: string[][];
	clickTab: string;
	setClickTab: React.Dispatch<React.SetStateAction<string>>;
}

export const TabMenu: React.FC<TabMenuProps> = ({ tabObj, clickTab, setClickTab }) => {
	return (
		<div>
			<Wrapper>
				{tabObj.map((menu, idx) => {
					return clickTab === menu[0] ? (
						<Clicked
							key={idx}
							onClick={() => {
								setClickTab(menu[0]);
							}}
						>
							{menu[1]}
							<Hr />
						</Clicked>
					) : (
						<UnClicked
							key={idx}
							onClick={() => {
								setClickTab(menu[0]);
							}}
						>
							{menu[1]}
						</UnClicked>
					);
				})}
			</Wrapper>
		</div>
	);
};
const Wrapper = styled.div`
	&:hover {
		cursor: pointer;
	}
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;

const CommonTab = styled.div`
	align-items: center;
	padding: 1rem;
	font-weight: bold;
`;

const Clicked = styled(CommonTab)`
	color: ${color.color2};
`;

const UnClicked = styled(CommonTab)`
	color: ${color.unSelectColor};
`;

const Hr = styled.hr`
	border: solid 1px ${color.color2};
	width: 11rem;
`;
