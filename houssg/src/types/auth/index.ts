interface AuthProps {
	isLoginComp: boolean;
	setIsLoginComp: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthInputType {
	title: string;
	password?: boolean;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}
export type { AuthProps, AuthInputType };
