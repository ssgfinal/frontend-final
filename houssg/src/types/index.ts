// type 지정을 위함 type 혹은 interface는 이 폴더에서 관리합니다

import { AuthProps, AuthInputType, AuthModeType, AuthPropsWithState } from './auth';
import { ManageNavProps, RoomComp } from './manage';
import { StyledActiveProps, SetStateToggle, UserType, UserTypeObject } from './common';
import { RegiStepProps, StepMoverType } from './regi';
import { ReservationDetailType, ReservationsType } from './reservation';
export type { AuthProps, AuthInputType, AuthModeType, ManageNavProps, RoomComp, RegiStepProps, StepMoverType, AuthPropsWithState };

export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject };
export type { ReservationDetailType, ReservationsType };
