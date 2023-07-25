import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./Login'));
const Register = dynamic(() => import('./Register'));

export default function Auth({
	render,
}: {
	render: 'LOGIN' | 'REGISTER';
}): JSX.Element {
	function Render(): JSX.Element {
		if (render === 'LOGIN') {
			return <Login />;
		}

		if (render === 'REGISTER') {
			return <Register />;
		}

		return <></>;
	}

	return (
		<div className='h-full w-full flex'>
			<div className='w-1/2 h-full flex-col bg-fuchsia-500 flex p-20 text-white shrink-0'>
				<h1 className='text-heading font-bold'>Todo</h1>
				<span className='font-semibold -mt-4'>Todo by appiskey</span>
			</div>
			<Render />
		</div>
	);
}
