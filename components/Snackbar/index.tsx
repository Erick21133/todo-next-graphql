'use client';

import { useMemo, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { UiContext } from '@contexts';

import type { UiContexts } from '@types';

export default function Snackbar(): JSX.Element {
	const { snackbar } = useContext(UiContext) as UiContexts;

	console.log('snackbar: ', snackbar);

	const computedBgColor: string = useMemo(() => {
		if (snackbar.type === 'ERROR') return '#f43f5e';
		if (snackbar.type === 'SUCCESS') return '#4ade80';
		return '';
	}, [snackbar.type]);

	return (
		<AnimatePresence>
			{snackbar.isOpen && (
				<motion.div
					initial={{
						opacity: 0,
						bottom: 10,
					}}
					animate={{
						opacity: 1,
						bottom: 40,
					}}
					exit={{
						opacity: 0,
						bottom: 10,
					}}
					style={{
						backgroundColor: computedBgColor,
					}}
					className='p-5 px-10 text-sx font-semibold text-white rounded-lg bg-red-500 flex items-center absolute z-[9999] bottom-10 left-[45%]'>
					<span>{snackbar.message}</span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
