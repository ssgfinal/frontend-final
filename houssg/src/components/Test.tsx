import Koala from '../assets/icons/Koala.jpg';

const Test = () => {
	console.log('컴포넌트에 들어옴:');

	return (
		<div style={{ width: '300px' }}>
			<p>숙소명</p>
			<div style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src={Koala} />
			</div>
			<br />
			평점 컴포넌트
			<br />
		</div>
	);
};

export default Test;
