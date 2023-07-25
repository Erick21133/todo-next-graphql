'use client';

import { ChangeEvent, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Link from 'next/link';

import { Button, Input } from '@ui';
import { queries } from '@/utils';

export default function Register(): JSX.Element {
  // const [] = useLazyQuery(queries)

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

	function onSubmit() {}

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
				<Button title='Login' type='submit' loading={false} />
			</form>
		</div>
	);
}
