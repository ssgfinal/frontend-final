const windowWarningState = () => {
	window.addEventListener('beforeunload', function (event) {
		// 상태가 날아가지 않도록 막기 위한 경고 메시지
		event.returnValue = '이 페이지를 나가면 변경된 내용이 저장되지 않을 수 있습니다.';
	});

	window.addEventListener('popstate', function (event) {
		event.preventDefault(); // 뒤로가기 이벤트의 기본 동작을 막음
	});
};

export { windowWarningState };
