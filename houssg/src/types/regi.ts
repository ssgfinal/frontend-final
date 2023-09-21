interface RegiStepProps {
	goStep: (step: number, newState?: { [key: string]: string | number }) => void;
	step: number;
	funnelState: { [key: string]: string };
}

export type { RegiStepProps };
