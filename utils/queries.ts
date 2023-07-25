import { gql } from '@apollo/client';

class Queries {
	LOGIN = gql`
		mutation Login($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				email
				error
				name
			}
		}
	`;
}

const query = new Queries();

export default query;
