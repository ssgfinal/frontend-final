import styled from 'styled-components';
import { StepMoverType } from '../../../../types';
import { color } from '../../../../assets/styles';

const StepMover: React.FC<StepMoverType> = ({ goStep, step, data, inactive, last }) => {
	return (
		<StepBtnAligner>
			{!!step && <StepBtn onClick={() => goStep(step - 1)}>이전</StepBtn>}
			{last ? (
				<StepBtn $inactive={inactive} onClick={() => !inactive && alert('끝')}>
					등록하기
				</StepBtn>
			) : (
				<StepBtn $inactive={inactive} onClick={() => !inactive && goStep(step + 1, data)}>
					다음 단계로
				</StepBtn>
			)}
		</StepBtnAligner>
	);
};

export default StepMover;

const StepBtnAligner = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	max-width: 600px;
	width: 100%;
	margin-top: 1rem;
`;

const StepBtn = styled.div<{ $inactive?: boolean }>`
	color: ${color.backColor};
	background-color: ${color.color2};
	border: 1px solid ${color.color2};
	border-radius: 0.3rem;
	margin-right: 1rem;
	padding: 0.4rem;
	text-align: center;
	&:hover {
		font-weight: ${(props) => !props.$inactive && 800};
	}
	cursor: ${(props) => (props.$inactive ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.$inactive ? 0.5 : 1)};
`;
