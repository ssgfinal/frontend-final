// type 지정을 위함 type 혹은 interface는 이 폴더에서 관리합니다

import { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState, IdFindingType, SmsParameter } from './auth';
import { ReservationDetailType, ReservationsType } from './reservation';
import { ManageNavProps, RoomComp, MyHouseData } from './manage';
import { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, RoomSlideProps, TimerProps, ProcessType } from './common';
import { RegiStepProps, StepMoverType } from './regi';
import { AuthLoginFunc, AuthSignUpFunc } from './rtk';

// auth Regi manage
export type { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState, IdFindingType, SmsParameter };

//common
export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, RoomSlideProps, TimerProps, ProcessType };
//reservation
export type { ReservationDetailType, ReservationsType };
//manage
export type { ManageNavProps, RoomComp, MyHouseData };
//regi
export type { RegiStepProps, StepMoverType };
//redux-toolkit
export type { AuthLoginFunc, AuthSignUpFunc };
