import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = (message: string, type: string) => {
	console.log('useToast 실행');
	// 1. 커스텀 훅을 import 했을 때 실행될 함수를 만든다.
	// 1-1. 해당 함수의 매개변수로 message와 type을 지정한다.
	const config: ToastOptions = {
		// 2. config 값을 설정해서 기본 커스터마이징을 한다.
		position: 'top-center',
		// 2-1. 위치: 위쪽 중간
		autoClose: 2000,
		// 2-2. 2초 후 사라짐
		hideProgressBar: true,
		// 2-3. 사라지기까지 progressBar 보이지 않게 설정
		closeOnClick: true,
		// 2-4. 클릭할 경우 토스트 메세지 사라짐
		rtl: false,
		// 2-5. 알림 좌우 반전 안 함
		pauseOnFocusLoss: false,
		// 2-6. 화면 벗어나도 알람 정지 안함
		draggable: false,
		// 2-7. 드래그 불가능
		pauseOnHover: false,
		// 2-8. 마우스 올리면 알람 정지하지 않음
	};

	switch (type) {
		// 3. type 설정 시, 해당 type에 맞춰 switch case가 걸리고, 해당하는 case의 토스트 메세지가 생성된다.
		case 'success':
			return toast.success(message, config);
		case 'error':
			return toast.error(message, config);
		case 'warning':
			return toast.warning(message, config);
		default:
			return toast(message, config);
	}
	// 3-1. 성공, 실패, 경고, default 케이스마다 토스트 메세지의 마크가 다르게 표시된다.
};
