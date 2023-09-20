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
}

export type { StyledActiveProps, SetStateToggle, UserType, UserTypeObject, UploaderSize };
