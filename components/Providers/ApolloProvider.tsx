'use client';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
} from '@apollo/client';

function client() {
	const link = new HttpLink({
		uri: 'http://localhost:3000/api/graphql',
	});

	return new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});
}

const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return <ApolloProvider client={client()}>{children}</ApolloProvider>;
};

export default Providers;
