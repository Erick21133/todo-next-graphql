'use client';

import { useContext } from 'react';

import { AuthContext } from '@contexts';
import { AuthContext as AuthContextsProps } from '@types';

export default function Header(): JSX.Element {
	const { user, logoutUser } = useContext(AuthContext) as AuthContextsProps;

	return (
		<div className='flex  h-[10%] shrink-0 items-center justify-between text-base font-semibold text-zinc-700'>
			<h1>{user.name}</h1>
			<span onClick={logoutUser} className='cursor-pointer'>
				logout
			</span>
		</div>
	);
}
