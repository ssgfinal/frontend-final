// type 지정을 위함 type 혹은 interface는 이 폴더에서 관리합니다

import { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState, IdFindingType, SmsParameter, NewPwProps, FindPwPermitProps } from './auth';
import {
	ReservationDetailType,
	ReservationsType,
	BookableRoomCnt,
	Schedule,
	SelectedReservationType,
	UserReview,
	AddUserReview,
} from './reservation';
import { ManageNavProps, MyHouseData, MyHouseDataHandleComp, EditMutationType, OwnerHouseReviewType } from './manage';
import { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, RoomSlideProps, TimerProps, ProcessType } from './common';
import { RegiStepProps, StepMoverType, FunnelPropsType } from './regi';
import { AuthLoginFunc, AuthSignUpFunc } from './rtk';
import { MyCouponList, EnrollCouponList, MyReviewList, MyFavoriteList } from './mypage';
import { HouseBaseInfo, HouseProps, HouseListProps, ServiceList, ReviewType, ReviewProps, SearchHouse } from './houseDetailPage';
import { RoomDataType, RoomComp, RoomData, AddRoomProps } from './room';
import {
	OwnerReservedRoom,
	OwnerAvailableRoom,
	CommonCalendarProps,
	CheckMyHouseReservationType,
	ReservationDropDown,
	CalendarEvent,
} from './ownerReservation';
import { CouponType } from './ coupon';

// auth Regi manage
export type { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState, IdFindingType, SmsParameter, NewPwProps, FindPwPermitProps };

//common
export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, RoomSlideProps, TimerProps, ProcessType };

//reservation
export type { ReservationDetailType, ReservationsType, BookableRoomCnt, Schedule, SelectedReservationType, UserReview, AddUserReview };

//ownerReservation

export type { OwnerReservedRoom, OwnerAvailableRoom, CommonCalendarProps, CheckMyHouseReservationType, ReservationDropDown, CalendarEvent };

//manage
export type { ManageNavProps, MyHouseData, MyHouseDataHandleComp, EditMutationType, OwnerHouseReviewType };
//regi
export type { RegiStepProps, StepMoverType, FunnelPropsType };
//redux-toolkit
export type { AuthLoginFunc, AuthSignUpFunc };
//mypage
export type { MyCouponList, EnrollCouponList, MyReviewList, MyFavoriteList };
// house
export type { HouseBaseInfo, HouseProps, HouseListProps, ServiceList, ReviewType, ReviewProps, SearchHouse };

// room
export type { RoomDataType, RoomComp, RoomData, AddRoomProps };

export type { CouponType };
