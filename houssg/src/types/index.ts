// type 지정을 위함 type 혹은 interface는 이 폴더에서 관리합니다

import { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState, IdFindingType, SmsParameter } from './auth';
import { ReservationDetailType, ReservationsType } from './reservation';
import { ManageNavProps, MyHouseData, MyHouseDataHandleComp, EditMutationType } from './manage';
import { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, RoomSlideProps, TimerProps, ProcessType } from './common';
import { RegiStepProps, StepMoverType, FunnelPropsType } from './regi';
import { AuthLoginFunc, AuthSignUpFunc } from './rtk';
import { UserMyPageType } from './mypage';
import { HouseBaseInfo } from './house';
import { RoomDataType, RoomComp, RoomData } from './room';
// auth Regi manage
export type { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState, IdFindingType, SmsParameter };

//common
export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, RoomSlideProps, TimerProps, ProcessType };
//reservation
export type { ReservationDetailType, ReservationsType };
//manage
export type { ManageNavProps, MyHouseData, MyHouseDataHandleComp, EditMutationType };
//regi
export type { RegiStepProps, StepMoverType, FunnelPropsType };
//redux-toolkit
export type { AuthLoginFunc, AuthSignUpFunc };
//mypage 충돌 해결
export type { UserMyPageType };
// house
export type { HouseBaseInfo };

// room
export type { RoomDataType, RoomComp, RoomData };
