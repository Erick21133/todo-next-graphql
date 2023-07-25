export interface SnackBarProps {
	isOpen?: boolean;
	message: string | null;
	type: 'ERROR' | 'SUCCESS';
}
