export const regSignUp = {
	regId: { reg: /^[a-zA-Z0-9_]{5,10}$/, tooltip: '한,영,_로 구성된 5~10글자' },
	regPw: { reg: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#_])[A-Za-z\d!@#_]{8,20}$/, tooltip: '소문자,숫자,특수문자(!, @, #, _)가 1개 이상 포함된 8~20글자' },
	regNick: { reg: /^[가-힣a-zA-Z0-9]{2,8}$/, tooltip: '한영숫자로 된 2~8글자' },
	regPhone: { reg: /^[0-9]+$/, tooltip: '- 없는 숫자로만 된 번호로 입력해주세요' },
};
