import { useState, useMemo, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import type { UserProps } from '@types';
import cookies from 'js-cookie';
import { queries } from '@utils';

export default function useAuth(): [
	UserProps,
	(user: UserProps) => void,
	() => void
] {
	const [verifyTokenResolver] = useMutation<{
		verifyToken: {
			name: string;
			email: string;
		};
	}>(queries.VERIFYTOKEN);

	const [user, setUser] = useState<UserProps>({
		email: '',
		name: '',
		authenticated: null,
		token: null,
	});

	useEffect(() => {
		const authToken = cookies.get('sid');

		console.log(authToken);
		console.log('auth token');

		verifyTokenResolver({
			variables: {
				token: authToken,
			},
		})
			.then(res => {
				setUser({
					name: res.data?.verifyToken.name as string,
					email: res.data?.verifyToken.email as string,
					token: authToken as string,
					authenticated: true,
				});
			})
			.catch(err => {
				setUser({
					name: '',
					email: '',
					token: null,
					authenticated: false,
				});
			});
	}, [verifyTokenResolver]);

	const _user = useMemo(() => user, [user]);

	const handleUser = useCallback((props: UserProps) => {
		setUser({ ...props });
	}, []);

	const logout = useCallback(() => {
		// handle logout
	}, []);

	return [_user, handleUser, logout];
}
