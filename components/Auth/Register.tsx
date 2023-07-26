'use client';

import { ChangeEvent, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';

import { Button, Input } from '@ui';
import { queries } from '@utils';
import { UiContext } from '@contexts';
import type {
	UiContexts,
	AuthenticatedResponse,
	AuthContext as AuthContextProps,
} from '@types';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/auth.context';

export default function Register(): JSX.Element {
	const router = useRouter();
	const { toggleSnackbar } = useContext(UiContext) as UiContexts;
	const { handleUser } = useContext(AuthContext) as AuthContextProps;

	const [registerResolver, { loading }] = useMutation<{
		register: AuthenticatedResponse;
	}>(queries.REIGSTER);

	const [values, setValues] = useState<{
		name: string;
		email: string;
		password: string;
	}>({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setValues(prev => ({ ...prev, [type]: e.target.value }));
	};

	async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			const missingFields: Array<string> = [];
			let isError: boolean = false;

			if (!values?.email) {
				missingFields.push('email');
				isError = true;
			}

			if (!values?.name) {
				missingFields.push('name');
				isError = true;
			}

			if (!values?.password) {
				missingFields.push('password');
				isError = true;
			}

			if (isError) {
				toggleSnackbar({
					message: `${missingFields?.join(',')} missing fields`,
					type: 'ERROR',
				});

				return;
			}

			if (!values?.email?.includes('@') || !values?.email?.includes('.com')) {
				toggleSnackbar({
					message: `Invalid email`,
					type: 'ERROR',
				});

				return;
			}

			if (values?.password?.length < 8) {
				toggleSnackbar({
					message: `Password too short`,
					type: 'ERROR',
				});

				return;
			}

			const response = await registerResolver({
				variables: {
					...values,
				},
			});

			console.log(response.data);
			console.log('register response');

			handleUser({
				email: response.data?.register.email as string,
				name: response.data?.register.name as string,
				token: response.data?.register.name as string,
				authenticated: true,
			});

			router.push('/');
		} catch (err) {
			toggleSnackbar({
				message: err?.message,
				type: 'ERROR',
			});
		}
	}

	return (
		<div className='w-full h-full flex flex-col p-20 bg-white'>
			<h2 className='text-heading font-bold text-zinc-800'>Register</h2>
			<span className='-mt-2 font-semibold text-zinc-600'>Register with us</span>
			<form
				onSubmit={onSubmit}
				className='w-[80%] flex h-full flex-col p-10 bg- justify-center gap-4'>
				<Input
					label='Name'
					placeholder='Enter your name'
					type='text'
					name='name'
					title='Enter your name'
					value={values.name}
					onChange={handleChange('name')}
				/>
				<Input
					label='Email'
					placeholder='Enter your email'
					type='email'
					name='email'
					title='Enter your email'
					value={values.email}
					onChange={handleChange('email')}
				/>
				<Input
					label='Password'
					placeholder='Enter your password'
					type='password'
					name='password'
					title='Enter password'
					value={values.password}
					onChange={handleChange('password')}
				/>
				<Link passHref href='/login'>
					<span
						className='text-sx text-zinc-600 font-semibold cursor-pointer
          '>
						Already have an account?
					</span>
				</Link>
				<Button title='Login' type='submit' loading={loading} />
			</form>
		</div>
	);
}
