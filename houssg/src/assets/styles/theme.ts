import { DefaultTheme } from 'styled-components';

export const color = {
  mainColor: '#CECDFF',
};

// 추후 회의 후 정의하기
export const basicTheme: DefaultTheme = {
  bgColor: 'white',
  largeFont: '21px',
  textColor: color.mainColor,
  btnColor: color.mainColor,
};

export const darkTheme: DefaultTheme = {
  bgColor: 'black',
  largeFont: '21px',
  textColor: 'white',
  btnColor: color.mainColor,
};
