'use client';

import { useState, ChangeEvent, useContext, useTransition } from 'react';
import { useMutation } from '@apollo/client';
import { CircleSpinner } from 'react-spinners-kit';
import { useRouter } from 'next/navigation';

import { Input } from '@ui';
import { queries } from '@utils';
import { UiContext, AuthContext } from '@contexts';
import {
	AuthContext as AuthContextProps,
	UiContexts as UiContextProps,
} from '@types';

export default function Create(): JSX.Element {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [createTodoResolver, { loading }] = useMutation(queries.CREATETODO);
	// const [fetchTodo] = useLazyQuery(queries.GETALLTODOS);

	const { user } = useContext(AuthContext) as AuthContextProps;
	const { toggleSnackbar } = useContext(UiContext) as UiContextProps;

	const [values, setValues] = useState({
		title: '',
		description: '',
	});

	const handleChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		setValues(prev => ({ ...prev, [type]: e.target.value }));
	};

	async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			if (!values.title.length) {
				toggleSnackbar({
					type: 'ERROR',
					message: 'Title field required',
				});
				return;
			}

			if (!user.token) {
				toggleSnackbar({
					type: 'ERROR',
					message: 'Wait',
				});

				return;
			}

			await createTodoResolver({
				variables: {
					token: user.token,
					title: values.title,
					description: values.description,
				},
			});

			toggleSnackbar({
				type: 'SUCCESS',
				message: 'Todo created',
			});
			setValues({
				title: '',
				description: '',
			});

			startTransition(() => {
				router.refresh();
			});
			// fetchTodo();
		} catch (err) {
			toggleSnackbar({
				type: 'ERROR',
				message: err?.message,
			});
		}
	}

	return (
		<form onSubmit={onSubmit} className='w-full flex items-center gap-4'>
			<div className='w-1/2'>
				<Input
					label=''
					placeholder='Title'
					onChange={handleChange('title')}
					value={values.title}
				/>
			</div>
			<div className='w-1/2'>
				<Input
					label=''
					placeholder='Description'
					onChange={handleChange('description')}
					value={values.description}
				/>
			</div>
			{(loading || isPending) && <CircleSpinner size={22} color='#d946ef' />}
			<div>
				<button type='submit' />
			</div>
		</form>
	);
}
