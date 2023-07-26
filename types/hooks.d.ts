export interface SnackBarProps {
	isOpen?: boolean;
	message: string | null;
	type: 'ERROR' | 'SUCCESS';
}

export interface UserProps {
	authenticated: boolean | null;
	email: string;
	name: string;
	token: string | null;
}
