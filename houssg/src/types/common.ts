import { ReactNode } from 'react';

interface StyledActiveProps {
	$active: boolean; // active 속성의 타입을 지정
}
interface SetStateToggle {
	[key: string]: React.Dispatch<React.SetStateAction<boolean>>;
}

type UserType = 'user' | 'owner' | 'manager';

interface UserTypeObject {
	type: UserType;
}

interface UploaderSize {
	height: string;
	width: string;
	children: ReactNode;
	setImage: React.Dispatch<React.SetStateAction<string>> | ((data: string) => void);
}

interface RoomSlideProps {
	data: string[];
	children?: ReactNode;
	// 수정이나 추가시
	setData?: (index: number) => void;
}

type ProcessType = 'start' | 'process' | 'restricted' | 'end';

interface TimerProps {
	time: number;
	setTimeStatus: React.Dispatch<React.SetStateAction<ProcessType>>;
	timeStatus: ProcessType;
}
export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, UploaderSize, RoomSlideProps, TimerProps, ProcessType };
