import dynamic from 'next/dynamic';
import { Todo } from '@ui';

import type { Todo as TodoProps } from '@types';

const Header = dynamic(() => import('./Header'));
const CreateTodo = dynamic(() => import('./Create'));

interface Props {
	todos: Array<TodoProps>;
}



export default function Home({ todos }: Props): JSX.Element {
	function RenderTodos(): any {
		return todos?.map((el, i) => <Todo key={i} {...el} />);
	}

	return (
		<div className='w-screen h-screen flex bg-fuchsia-500 items-center justify-center'>
			<div className='w-1/2 h-[90%] flex bg-white rounded-xl p-8 py-4 flex-col'>
				<Header />

				<div className='w-full h-[90%] flex flex-col  shrink-0 justify-between'>
					<div className='w-full flex flex-col gap-6 h-[90%] overflow-y-scroll'>
						<RenderTodos />
					</div>
					<CreateTodo />
				</div>
			</div>
		</div>
	);
}

