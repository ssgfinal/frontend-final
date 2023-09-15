import { color, basicTheme } from './theme';
import GlobalStyle from './GlobalStyle';
import { devideOnce, devideTwice, devideThird } from './size';
//Auth관련
import { AuthTitle, AuthContainer } from './StyledComponents';
//OwnerManage관련
import {
	HouseInfoContainer,
	InfoText,
	SubInfoAligner,
	InfoWrapper,
	HouseTabContainer,
	InfoTitleText,
	NavClickComp,
	ManageReadTitle,
} from './StyledComponents';

//UserReservation.tsx
import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from './StyledComponents';

// 색 크기 theme
export { color, basicTheme, devideOnce, devideTwice, devideThird, GlobalStyle };

//Auth,Manage Comp
export {
	AuthTitle,
	AuthContainer,
	HouseInfoContainer,
	InfoText,
	SubInfoAligner,
	InfoWrapper,
	HouseTabContainer,
	InfoTitleText,
	NavClickComp,
	ManageReadTitle,
};

//UserReservation
export { ReservationCommonBox, UserReservationTitle, UserReservationLeft };
