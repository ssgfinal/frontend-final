interface StepProps {
	goStep: (step: number, newState?: { [key: string]: string | number }) => void;
	step: number;
}

interface RegiStepProps extends StepProps {
	funnelState?: { businessNum: number; name: string; businessImg: string; [key: string]: string | number };
}

interface StepMoverType extends StepProps {
	data: { [key: string]: string | number };
	inactive: boolean;
	last?: true;
}
export type { RegiStepProps, StepMoverType };
