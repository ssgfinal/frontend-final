import { Modal } from 'antd';
import { ReactNode } from 'react';
interface CommonModalProps {
	isModalOpen: boolean;
	children: ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({ isModalOpen, children }) => {
	// const showModal = () => {
	// 	setIsModalOpen(true);
	// };

	return (
		<div>
			<Modal open={isModalOpen} footer={null} keyboard={true} centered maskClosable closeIcon={null}>
				{children}
			</Modal>
		</div>
	);
};

export default CommonModal;
