'use client';

import { createContext } from 'react';
import { useAuth } from '@hooks';

import type { AuthContext as AuthContextProps } from '@types';

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, handleUser, logoutUser] = useAuth();

	const val: AuthContextProps = {
		user,
		handleUser,
		logoutUser,
	};

	return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};
