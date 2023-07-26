import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { gql } from '@apollo/client';

import { Home as Component } from '@components';
import client from '@/lib/apolloClient';

import type { Todo } from '@types';

async function getData(token: string) {
	const { data, error } = await client().query<{
		todos: Array<Todo>;
	}>({
		query: gql`
			query {
				todos(
					token: "${token}"
				) {
					id
					description
					createdAt
					status
					title
				}
			}
		`,
		fetchPolicy: 'no-cache',
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

export default async function Home() {
	const cookie = cookies();
	const authorization = cookie.get('sid');

	if (!authorization?.value) {
		redirect('/login');
	}

	const data = await getData(authorization.value);

	return (
		<div className='w-screen h-screen'>
			<Component todos={data.todos} />
		</div>
	);
}
