interface AuthProps {
	isLoginComp: boolean;
	setIsLoginComp: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthInputType {
	title: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	password?: boolean;
	reg?: { reg: RegExp; tooltip: string };
}

interface AuthModeType {
	children: string;
	isLoginComp: boolean;
	setIsLoginComp: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthSubmitType {
	children: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export type { AuthProps, AuthInputType, AuthModeType, AuthSubmitType };
