const windowWarningState = () => {
	window.addEventListener('popstate', popstateHandler);
};

const removeWindowWarningState = () => {
	window.removeEventListener('popstate', popstateHandler);
};

const popstateHandler = (event: PopStateEvent) => {
	event.preventDefault(); // 뒤로가기 이벤트의 기본 동작을 막음
};

export { windowWarningState, removeWindowWarningState };
