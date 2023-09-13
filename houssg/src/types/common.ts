interface StyledActiveProps {
	$active: boolean; // active 속성의 타입을 지정
}
interface SetStateToggle {
	[key: string]: React.Dispatch<React.SetStateAction<boolean>>;
}

type userType = 'user' | 'owner' | 'manager';

interface userTypeObject {
	type: userType;
}
export type { StyledActiveProps, SetStateToggle, userType, userTypeObject };
