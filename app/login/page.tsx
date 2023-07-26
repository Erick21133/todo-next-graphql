import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Auth } from '@components';

export default function Home() {
	const cookie = cookies();

	const authorization = cookie.get('sid');

	if (authorization?.value?.length) {
		redirect('/');
	}

	return (
		<div className='w-screen h-screen'>
			<Auth render='LOGIN' />
		</div>
	);
}
