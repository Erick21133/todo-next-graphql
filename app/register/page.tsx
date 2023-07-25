import { Auth } from '@components';

export default function Home() {
	return (
		<div className='w-screen h-screen'>
			<Auth render='REGISTER' />
		</div>
	);
}
