import { ProcessType } from '.';

interface AuthProps {
	authStep: string;
	setAuthStep: React.Dispatch<React.SetStateAction<string>>;
}

interface FindPwPermitProps {
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	setPermittedUserId: React.Dispatch<React.SetStateAction<string>>;
}

interface NewPwProps extends AuthProps {
	userId: string;
}

interface AuthPropsWithState extends AuthProps {
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IdFindingType {
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	setFoundId: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthInputType {
	title: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	password?: boolean;
	reg?: { reg: RegExp; tooltip: string };
	keyPressFunc?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface AuthModeType extends AuthProps {
	children: string;
}

interface AuthSubmitType {
	children: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	disabled?: boolean;
	pending?: boolean;
}

type SmsParameter = (
	phone: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setTimeStatus: React.Dispatch<React.SetStateAction<ProcessType>>,
	setTime: React.Dispatch<React.SetStateAction<number>>,
) => void;
export type {
	AuthProps,
	AuthInputType,
	AuthModeType,
	AuthSubmitType,
	AuthPropsWithState,
	IdFindingType,
	SmsParameter,
	NewPwProps,
	FindPwPermitProps,
};
