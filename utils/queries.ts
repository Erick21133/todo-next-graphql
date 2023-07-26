import { gql } from '@apollo/client';

class Queries {
	LOGIN = gql`
		mutation Login($email: String!, $password: String!) {
			login(email: $email, password: $password) {
				email
				token
				name
			}
		}
	`;

	REIGSTER = gql`
		mutation Register($email: String!, $password: String!, $name: String!) {
			register(email: $email, password: $password, name: $name) {
				email
				id
				name
				token
			}
		}
	`;

	VERIFYTOKEN = gql`
		mutation VerifyToken($token: String!) {
			verifyToken(token: $token) {
				email
				name
			}
		}
	`;

	CREATETODO = gql`
		mutation CreateTodo(
			$token: String!
			$title: String!
			$status: Boolean
			$description: String
		) {
			createTodo(
				token: $token
				title: $title
				status: $status
				description: $description
			) {
				id
			}
		}
	`;

	GETALLTODOS = gql`
		query Todos($token: String!) {
			todos(token: $token) {
				id
				description
				createdAt
				status
				title
			}
		}
	`;

	UPDATETODO = gql`
		mutation UpdateTodo(
			$token: String!
			$todoId: String!
			$status: Boolean
			$description: String
			$title: String
		) {
			updateTodo(
				token: $token
				todoId: $todoId
				status: $status
				description: $description
				title: $title
			) {
				id
			}
		}
	`;

	DELETETODO = gql`
		mutation DeleteTodo($token: String!, $todoId: String!) {
			deleteTodo(token: $token, todoId: $todoId) {
				id
			}
		}
	`;
}

const query = new Queries();

export default query;
