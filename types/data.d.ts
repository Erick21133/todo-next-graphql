export interface AuthenticatedResponse {
	email: string;
	token: string;
	name: string;
}

export interface Todo {
	id: string;
	description: string;
	createdAt: string;
	status: boolean;
	title: string;
}
