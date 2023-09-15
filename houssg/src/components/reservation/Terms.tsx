import styled from 'styled-components';

const Terms = () => {
	return (
		<div>
			<Title>개인 정보 제공 및 이용 약관</Title>
			<p>이 웹사이트는 사용자의 개인 정보를 수집하고 이용합니다. 수집되는 정보와 그 이용 목적에 대한 자세한 내용은 아래와 같습니다.</p>
			<br />
			<SubTitle> 수집 · 이용 동의 목적</SubTitle>

			<p>
				계약의 이행 및 서비스 제공, 예약 · 구매 · 관심상품 내역, 결제대금의 청구, 상담 · 불만 · 민원처리, 고지 · 안내사항 전달, 상품 · 서비스 이용실적
				정보 통계 · 분석, 상품 · 서비스 개선 및 추천, 불법 · 부정이용방지
			</p>
			<br />
			<SubTitle>항목</SubTitle>
			<p>
				예약 · 구매 시: 공통 - 예약내역(예약일시, 결제금액, 업체명), 휴대폰 번호 예약자 및 구매자 - 이름, 휴대폰 번호, (필요한 서비스의 경우)생년월일
				예약자와 방문자가 다른 경우 - 방문자 및 탑승자의 이름, 휴대폰 번호, (필요한 서비스의 경우)생년월일 해외숙소 예약 시 - 예약자의 이메일 주소,
				투숙객의 영문 이름, (만 17세 이하 자녀 동반 시) 자녀의 나이 예약확인서 발급 시 - 예약자의 이메일 주소 현금 환불 요청 시: 계좌번호 및 예금주명
				고객 상담 시: 상담내용 및 상담에 필요한 개인정보
			</p>
			<br />
			<SubTitle>보유 · 이용기간</SubTitle>
			<p>
				용종료일로부터 상담 등 민원처리, 정산 및 환불 처리를 위해 30일 후 삭제 관계법령에 따라 보존할 필요가 있는 경우 해당 법령에서 요구하는 기한까지
				보관 (예: 구매 회원의 경우 5년간, IP 주소의 경우 3개월)
			</p>
		</div>
	);
};

export default Terms;

const Title = styled.div`
	margin-bottom: 2rem;
	padding: 0.5rem;
	font-weight: bolder;
`;

const SubTitle = styled.div`
	padding: 0.5rem;
	font-weight: bold;
`;
