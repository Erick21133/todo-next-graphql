import type { SnackBarProps } from './hooks';

export interface UiContexts {
	snackbar: SnackBarProps;
	toggleSnackbar: (props: SnackBarProps) => void;
}
