import { cookies } from 'next/headers';
import { Auth } from '@components';
import { redirect } from 'next/navigation';

export default function Home() {
	const cookie = cookies();

	const authorization = cookie.get('sid');

	if (authorization?.value?.length) {
		redirect('/');
	}
	return (
		<div className='w-screen h-screen'>
			<Auth render='REGISTER' />
		</div>
	);
}
