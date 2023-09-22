const windowWarningState = () => {
	window.addEventListener('beforeunload', beforeUnloadHandler);
	window.addEventListener('popstate', popstateHandler);
};

const removeWindowWarningState = () => {
	window.removeEventListener('beforeunload', beforeUnloadHandler);

	window.removeEventListener('popstate', popstateHandler);
};

const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
	event.returnValue = '이 페이지를 나가면 변경된 내용이 저장되지 않을 수 있습니다.';
};

const popstateHandler = (event: PopStateEvent) => {
	event.preventDefault(); // 뒤로가기 이벤트의 기본 동작을 막음
};

export { windowWarningState, removeWindowWarningState };
