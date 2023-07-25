import { useCallback, useMemo, useState } from 'react';

import type { SnackBarProps } from '@types';

export default function useSnackbar(): [
	SnackBarProps,
	(props: SnackBarProps) => void
] {
	const [snackbar, setSnackbar] = useState<SnackBarProps>({
		isOpen: false,
		message: null,
		type: 'ERROR',
	});

	const _snackbar = useMemo(() => snackbar, [snackbar]);

	const debounce = (func: () => void, timer: number) => {
		let timeout: number = 0;

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}

			setTimeout(() => {
				func.apply(null);
			}, timer);
		};
	};

	const toggleSnackbar = useCallback((props: SnackBarProps) => {
		setSnackbar(prev => ({ ...props, isOpen: true }));

		debounce(() => {
			setSnackbar(prev => ({ ...prev, isOpen: false }));
		}, 3000)();
	}, []);

	return [_snackbar, toggleSnackbar];
}
