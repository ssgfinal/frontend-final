import { Modal } from 'antd';
import { ReactNode } from 'react';
// import { styled } from 'styled-components';

interface CommonModalProps {
	isModalOpen: boolean;
	children: ReactNode;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonModal: React.FC<CommonModalProps> = ({ setIsModalOpen, isModalOpen, children }) => {
	return (
		<div>
			<Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} keyboard centered maskClosable>
				{children}
			</Modal>
		</div>
	);
};

export default CommonModal;
