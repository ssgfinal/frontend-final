interface ManageHouseProps {
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ManageNavProps {
	isRoomSelected: boolean;
	setSelectedNav: React.Dispatch<React.SetStateAction<boolean>>;
	isOpenTabComp: boolean;
	setIsOpenTabComp: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { ManageHouseProps, ManageNavProps };