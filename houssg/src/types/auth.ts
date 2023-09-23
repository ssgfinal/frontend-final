interface AuthProps {
	authStep: string;
	setAuthStep: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthPropsWithState {
	authStep: string;
	setAuthStep: React.Dispatch<React.SetStateAction<string>>;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthInputType {
	title: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	password?: boolean;
	reg?: { reg: RegExp; tooltip: string };
}

interface AuthModeType extends AuthProps {
	children: string;
}

interface AuthSubmitType {
	children: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export type { AuthProps, AuthInputType, AuthModeType, AuthSubmitType, AuthPropsWithState };
