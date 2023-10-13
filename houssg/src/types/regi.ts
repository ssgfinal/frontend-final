interface StepProps {
	goStep: (step: number, newState?: FunnelPropsType) => void;
	step: number;
}

interface FunnelPropsType {
	businessNum?: string;
	name?: string;
	businessImg?: string;
	targetAddress?: string;
	houseImage?: string;
	houseService?: number[];
	houseNumber?: string;
	houseType?: string;
	houseImageFile?: File;
	checkIn?: string;
	checkOut?: string;
	detailText?: string;
}

interface RegiStepProps extends StepProps {
	funnelState?: {
		businessNum: string;
		name: string;
		businessImg: string;
		targetAddress: string;
		houseImage: string;
		houseService: number[];
		houseNumber: string;
		houseType: string;
		houseImageFile: File;
		checkIn: string;
		checkOut: string;
		detailText: string;
	};
}

interface StepMoverType extends StepProps {
	data: FunnelPropsType;
	inactive: boolean;
	last?: true;
}
export type { RegiStepProps, StepMoverType, FunnelPropsType };
