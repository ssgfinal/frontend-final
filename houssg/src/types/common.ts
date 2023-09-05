interface StyledActiveProps {
	$active: boolean; // active 속성의 타입을 지정
}
interface SetStateToggle {
	[key: string]: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { StyledActiveProps, SetStateToggle };
