export const regSignUp = {
	regId: { reg: '^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', tooltip: '이메일 형식의 아이디' },
	regPw: { reg: '^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', tooltip: '영어와 숫자가 섞인 #@!이 가능한 7~10' },
	regNick: { reg: '^.{3,10}$', tooltip: '3~10글자 사이의 닉네임' },
	regPhone: { reg: '^[0-9]+$', tooltip: '- 없는 숫자로만 된 번호로 입력해주세요' },
};
