interface StepProps {
	goStep: (step: number, newState?: { [key: string]: string | number | number[] }) => void;
	step: number;
}

interface RegiStepProps extends StepProps {
	funnelState?: {
		businessNum: number;
		name: string;
		businessImg: string;
		targetAddress: string;
		houseImage: string;
		houseService: number[];
		houseNumber: string;
		houseType: string;
	};
}

interface StepMoverType extends StepProps {
	data: { [key: string]: string | number | number[] };
	inactive: boolean;
	last?: true;
}
export type { RegiStepProps, StepMoverType };
