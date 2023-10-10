import styled from 'styled-components';
import { StepMoverType } from '../../../../types';
import { color } from '../../../../assets/styles';
import { onRegiFunnelData } from '../../../../helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ownerKey, ownerRoute } from '../../../../assets/constant';
import { useNavigate } from 'react-router-dom';

const StepMover: React.FC<StepMoverType> = ({ goStep, step, data, inactive, last }) => {
	// const { mutate } = useMutation(() => onRegiFunnelData(data));
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: () => onRegiFunnelData(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ownerKey.myHouseList] });
			alert('성공');
			navigate(ownerRoute.management);
		},
	});

	const onRegiHandler = () => {
		mutate();
	};

	return (
		<StepBtnAligner>
			{!!step && <StepBtn onClick={() => goStep(step - 1)}>이전</StepBtn>}
			{last ? (
				<StepBtn $inactive={inactive} onClick={onRegiHandler}>
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
	max-width: 500px;
	width: 100%;
	margin-top: 2rem;
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
