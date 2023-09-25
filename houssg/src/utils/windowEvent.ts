const windowWarningState = () => {
	window.addEventListener('popstate', popstateHandler);
	window.addEventListener('beforeunload', beforeunloadHandler);
};

const removeWindowWarningState = () => {
	window.removeEventListener('popstate', popstateHandler);
	window.removeEventListener('beforeunload', beforeunloadHandler);
};

const popstateHandler = (event: PopStateEvent) => {
	event.preventDefault(); // 뒤로가기 이벤트의 기본 동작을 막음
};

const beforeunloadHandler = (event: BeforeUnloadEvent) => {
	event.returnValue = '작업 내용이 저장되지 않을 수 있습니다.';
};

export { windowWarningState, removeWindowWarningState };
