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
export type { AuthProps, AuthInputType };
