const devideOnce = {
	first: '800px',
};

const devideTwice = {
	first: '1100px',
	second: '800px',
};

const devideThird = {
	first: '1200px',
	second: '800px',
	third: '500px',
};
const rootFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');

export { devideOnce, devideTwice, devideThird, rootFontSize };
