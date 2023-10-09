interface StepProps {
	goStep: (step: number, newState?: { [key: string]: string | number | number[] | File | null }) => void;
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
		houseImageFile: File;
	};
}

interface StepMoverType extends StepProps {
	data: { [key: string]: string | number | number[] | File | null };
	inactive: boolean;
	last?: true;
}
export type { RegiStepProps, StepMoverType };
