import type { SnackBarProps } from './hooks';
import type { UserProps } from './hooks';

export interface UiContexts {
	snackbar: SnackBarProps;
	toggleSnackbar: (props: SnackBarProps) => void;
}

export interface AuthContext {
	user: UserProps;
	logoutUser: () => void;
	handleUser: (props: UserProps) => void;
}
