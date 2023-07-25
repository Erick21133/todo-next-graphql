import { HTMLProps } from 'react';

export interface InputTypes extends HTMLProps<HTMLInputElement> {
	label: string;
	error?: boolean;
	hookProps?: unknown;
}
