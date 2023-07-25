import { objectType } from 'nexus';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.string('id');
		t.string('name');
		t.string('email');
	},
});

export const Login = objectType({
	name: 'Login',
	definition(t) {
		t.nonNull.string('email');
		t.nonNull.boolean('error');
		t.nonNull.string('name');
	},
});
