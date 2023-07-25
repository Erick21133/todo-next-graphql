import { memo } from 'react';

import type { InputTypes } from './types';

function Input({ label, ...props }: InputTypes): JSX.Element {
	return (
		<div className='flex flex-col'>
			<span className='text-zinc-700 font-semibold'>{label}</span>
			<input
				{...props}
				className='w-full text-zinc-700 h-14 rounded-lg bg-zinc-200 px-4 text-sx font-semibold outline-none focus:border focus:border-fuchsia-500 border border-transparent transition duration-200 hover:border-fuchsia-500'
			/>
		</div>
	);
}

export default memo(Input);
