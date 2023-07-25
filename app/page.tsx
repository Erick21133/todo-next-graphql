import { Auth } from '@components';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
	const cookie = cookies();

	const authorization = cookie.get('sid');

	if (!authorization?.value) {
		redirect('/login');
	}

	return <div className='w-screen h-screen'></div>;
}
