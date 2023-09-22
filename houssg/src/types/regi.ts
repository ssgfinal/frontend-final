interface RegiStepProps {
	goStep: (step: number, newState?: { [key: string]: string | number }) => void;
	step: number;
	funnelState?: { businessNum: number; name: string; businessImg: string; [key: string]: string | number };
}

export type { RegiStepProps };
