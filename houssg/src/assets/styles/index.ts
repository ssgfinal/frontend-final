import { color, basicTheme } from './theme';
import GlobalStyle from './GlobalStyle';
import { devideOnce, devideTwice, devideThird, rootFontSize } from './size';
// commonStyle
import { flexCenter } from './commonStyle';

//Auth관련
import {
	AuthTitle,
	AuthContainer,
	AuthFindingBtn,
	CheckerContainer,
	UseAbilitiyChecker,
	FinderRouteAligner,
	FindInputAligner,
} from './StyledComponents';
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

// comon
import { SmallIndicatorText, HoverText, IconContainer, NoIcon } from './StyledComponents';

//UserReservation.tsx
import { ReservationCommonBox, UserReservationTitle, UserReservationLeft } from './StyledComponents';
//OwnerRegi
import { HouseRegiEachWrapper, RegiHeadText } from './StyledComponents';
// 색 크기 theme
export { color, basicTheme, devideOnce, devideTwice, devideThird, GlobalStyle, rootFontSize };

//Auth,Manage Comp
export {
	AuthFindingBtn,
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
	CheckerContainer,
	UseAbilitiyChecker,
	FinderRouteAligner,
	FindInputAligner,
};

// common
export { SmallIndicatorText, HoverText, IconContainer, NoIcon };

//UserReservation
export { ReservationCommonBox, UserReservationTitle, UserReservationLeft };

//commonStyle
export { flexCenter };

// RegiStyle
export { HouseRegiEachWrapper, RegiHeadText };
