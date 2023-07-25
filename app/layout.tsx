import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { ApolloProvider } from '@components';
import { UiProvider } from '@contexts';

const Snackbar = dynamic(() => import('../components/Snackbar'));

export const metadata: Metadata = {
	title: 'GraphQL TODO',
	description: 'Appiskey test todo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<ApolloProvider>
					<UiProvider>
						{children}
						<Snackbar />
					</UiProvider>
				</ApolloProvider>
			</body>
		</html>
	);
}
