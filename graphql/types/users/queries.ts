import { extendType, nonNull, stringArg } from 'nexus';
import {
	loginResolver,
	registerResolver,
	verifyTokenResolver,
} from './resolvers';

export const AuthQueries = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('login', {
			type: 'Login',
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
			},
			resolve: loginResolver,
		});

		t.field('register', {
			type: 'User',
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
				name: nonNull(stringArg()),
			},
			resolve: registerResolver,
		});
		t.field('verifyToken', {
			type: 'User',
			args: {
				token: nonNull(stringArg()),
			},
			resolve: verifyTokenResolver,
		});
	},
});
