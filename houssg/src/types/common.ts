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
	setImage: React.Dispatch<React.SetStateAction<string>>;
}

export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, UploaderSize };
