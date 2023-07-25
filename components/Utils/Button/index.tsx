'use client';
import { memo } from 'react';
import { CircleSpinner } from 'react-spinners-kit';

import type { ButtonProps } from './types';

function Button({ loading, title, ...props }: ButtonProps): JSX.Element {
	return (
		<button
			{...props}
			disabled={props?.disabled || loading}
			className='w-40 h-14 rounded-lg bg-fuchsia-500 text-white text-ssx font-semibold flex items-center  justify-center hover:bg-fuchsia-600 transition duration-150'>
			{loading ? <CircleSpinner size={22} /> : title}
		</button>
	);
}

export default memo(Button);
