'use client';

import { ChangeEvent, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';

import { Input, Button } from '@ui';
import { queries } from '@utils';
import { UiContext, AuthContext } from '@contexts';

import type {
	UiContexts,
	AuthContext as AuthContextProps,
	AuthenticatedResponse,
} from '@types';

export default function Login(): JSX.Element {
	const router = useRouter();
	const { toggleSnackbar } = useContext(UiContext) as UiContexts;
	const { user, handleUser } = useContext(AuthContext) as AuthContextProps;

	const [loginResolver, { loading, error }] = useMutation<{
		data: AuthenticatedResponse;
	}>(queries.LOGIN);

	const [values, setValues] = useState<{
		email: string;
		password: string;
	}>({
		email: '',
		password: '',
	});

	const handleChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setValues(prev => ({ ...prev, [type]: e.target.value }));
	};

	async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const errors: { isError: boolean; message: string; fields: Array<string> } =
				{
					isError: false,
					message: '',
					fields: [],
				};

			if (!values?.email?.length) {
				// validate email
				errors.fields.push('email');
				errors.message = 'Email not define';
				errors.isError = true;
			}
			if (!values?.password?.length) {
				errors.fields.push('password');
				errors.message = 'Password not define';
				errors.isError = true;
			}

			if (errors.isError) {
				console.log('toggle snackbar');
				// show modal
				toggleSnackbar({
					message: `${errors?.fields?.join(',')} is missing`,
					type: 'ERROR',
				});

				return;
			}

			if (
				(values?.email?.length > 0 && !values.email.includes('@')) ||
				!values.email.includes('.com')
			) {
				errors.message = 'Invalid email';
				errors.isError = true;
				errors.fields = ['email'];
			}

			if (values?.password?.length < 8) {
				errors.message = 'Password too short';
				errors.isError = true;
				errors.fields = ['password'];
			}

			if (errors.isError) {
				toggleSnackbar({
					message: `${errors?.fields?.join(',')} - ${errors.message}`,
					type: 'ERROR',
				});

				return;
			}

			const response = await loginResolver({
				variables: {
					email: values?.email,
					password: values?.password,
				},
			});

			handleUser({
				authenticated: true,
				name: response.data?.data.name as string,
				email: response.data?.data.email as string,
				token: response.data?.data.token as string,
			});

			router.push('/');
		} catch (err) {
			// hanle error
			toggleSnackbar({
				message: err?.message,
				type: 'ERROR',
			});
		}
	}

	return (
		<div className='w-full h-full flex flex-col p-20 bg-white'>
			<h2 className='text-heading font-bold text-zinc-800'>Login</h2>
			<span className='-mt-2 font-semibold text-zinc-600'>
				login using email & password
			</span>
			<form
				onSubmit={onSubmit}
				className='w-[80%] flex h-full flex-col p-10 bg- justify-center gap-4'>
				<Input
					label='Email'
					placeholder='Enter your email'
					type='email'
					name='email'
					value={values?.email}
					onChange={handleChange('email')}
				/>
				<Input
					label='Password'
					placeholder='Enter your password'
					type='password'
					name='password'
					value={values?.password}
					onChange={handleChange('password')}
				/>
				<Link passHref href='/register'>
					<span
						className='text-sx text-zinc-600 font-semibold cursor-pointer
					'>
						{"Don't have account?"}
					</span>
				</Link>
				<Button title='Login' type='submit' loading={loading} />
			</form>
		</div>
	);
}
