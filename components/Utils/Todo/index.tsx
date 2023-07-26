'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useTransition, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client';
import { queries } from '@utils';
import { Button, Check, Pending } from '..';
import { AuthContext, UiContext } from '@contexts';

import type {
	Todo as TodoProps,
	AuthContext as AuthContextsProps,
	UiContexts as UiContextsProps,
} from '@types';

export default function Todo(props: TodoProps): JSX.Element {
	const router = useRouter();
	const { user } = useContext(AuthContext) as AuthContextsProps;
	const { toggleSnackbar } = useContext(UiContext) as UiContextsProps;

	const [updateTodoResolver, { loading: updating }] = useMutation(
		queries.UPDATETODO
	);
	const [deleteTodoResolver, { loading: deleting }] = useMutation(
		queries.DELETETODO
	);

	const [expand, setExpand] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const handleToggleExpand = useCallback(() => {
		setExpand(prev => !prev);
	}, []);

	const handleToggleStatus = useCallback(async () => {
		try {
			await updateTodoResolver({
				variables: {
					token: user?.token,
					todoId: props.id,
					status: false,
					title: props.title,
					description: props.description,
				},
			});

			toggleSnackbar({
				type: 'SUCCESS',
				message: 'Updated',
			});

			startTransition(() => {
				router.refresh();
			});
		} catch (err) {
			toggleSnackbar({
				type: 'ERROR',
				message: err?.message,
			});
		}
	}, [user?.token, props?.id, updateTodoResolver]);

	const handleDelete = useCallback(async () => {
		try {
			await deleteTodoResolver({
				variables: {
					token: user?.token,
					todoId: props.id,
				},
			});

			toggleSnackbar({
				type: 'SUCCESS',
				message: 'Deleted',
			});

			startTransition(() => {
				router.refresh();
			});
		} catch (err) {
			toggleSnackbar({
				type: 'ERROR',
				message: err?.message,
			});
		}
	}, [user?.token]);

	const handleUpdate = () => {};

	return (
		<motion.div
			initial={{
				height: 40,
			}}
			animate={{
				height: expand ? 200 : 56,
			}}
			onClick={handleToggleExpand}
			className={`w-full rounded-lg shrink-0 bg-fuchsia-100 flex items-start py-2 justify-between px-4 font-semibold text-fuchsia-400 cursor-pointer transition  duration-150 flex-col ${
				expand ? '' : 'hover:bg-fuchsia-200'
			}`}>
			<div className='w-full flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<div className='w-10 h-10 rounded-full bg-fuchsia-400 text-white flex items-center justify-center'>
						{/* {props?.status ? <BsCheckLg /> : <GiSightDisabled />} */}
						<div className='svg-white'>
							{props?.status ? <Pending /> : <Check />}
						</div>
					</div>
					<h1 className={`${props?.status === false && 'line-through'}`}>
						{props.title}
					</h1>
				</div>
				<span className='text-xs'>{props.createdAt}</span>
			</div>
			{expand && (
				<div className='flex flex-col gap-5 w-full'>
					<>
						<span className='text-xs'>{props.description}</span>
						<div className='w-full flex justify-end gap-2'>
							<Button
								title={props.status ? 'Complete' : 'Not Complete'}
								onClick={handleToggleStatus}
								style={{ height: 40, fontSize: 12, width: '15%' }}
								loading={updating || isPending}
							/>
							<Button
								title='Update'
								style={{ height: 40, fontSize: 12, width: '15%' }}
								onClick={handleUpdate}
								loading={updating || isPending}
							/>
							<Button
								title='Delete'
								loading={deleting || isPending}
								style={{ height: 40, fontSize: 12, width: '15%' }}
								onClick={handleDelete}
							/>
						</div>
					</>
				</div>
			)}
		</motion.div>
	);
}
