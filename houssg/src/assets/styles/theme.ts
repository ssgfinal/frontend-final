import { DefaultTheme } from 'styled-components';

// colors  TODO: 변수명 수정, 추후 테마 변경 적용하려면 코드 추가
export const color = {
	color1: '#845EC2',
	color2: '#A178DF',
	color3: '#BE93FD',
	color4: '#DCB0FF',
	color5: '#FACCFF',
	basicColor: '#000000',
	backColor: '#FFFFFF',
	unSelectColor: 'lightgray',
	darkGrayColor: 'rgba(90, 90, 90, 0.8)',
	lightGrayColor: 'rgba(90, 90, 90, 0.1)',
};

// 추후 테마색 결정
export const basicTheme: DefaultTheme = {
	bgColor: color.backColor,
	textColor: color.basicColor,
};
