"use client"
import React, { createContext } from 'react';

import { useSnackbar } from '@hooks';

import type { UiContexts } from '@types';

export const UiContext = createContext<UiContexts | null>(null);

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
	const [snackbar, toggleSnackbar] = useSnackbar();

	const val: UiContexts = {
		snackbar,
		toggleSnackbar,
	};

	return <UiContext.Provider value={val}>{children}</UiContext.Provider>;
};
