const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>, enterFunc: () => void) => {
	if (e.key === 'Enter') {
		enterFunc();
	}
};

export { handleEnterPress };
