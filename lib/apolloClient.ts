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

export default client;
