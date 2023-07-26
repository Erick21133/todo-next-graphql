import { booleanArg, extendType, nonNull, nullable, stringArg } from 'nexus';
import { getTodos, createTodo, deleteTodo, updateTodo } from './resolvers';

export const TodoQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('todos', {
			type: 'Todo',
			args: {
				token: nonNull(stringArg()),
			},
			resolve: getTodos,
		});
	},
});

export const TodoMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('createTodo', {
			type: 'Todo',
			args: {
				token: nonNull(stringArg()),
				status: nullable(booleanArg()),
				description: nullable(stringArg()),
				title: nonNull(stringArg()),
			},
			resolve: createTodo,
		});

		t.field('deleteTodo', {
			type: 'Todo',
			args: {
				token: nonNull(stringArg()),
				todoId: nonNull(stringArg()),
			},
			resolve: deleteTodo,
		});

		t.field('updateTodo', {
			type: 'Todo',
			args: {
				token: nonNull(stringArg()),
				status: nullable(booleanArg()),
				description: nullable(stringArg()),
				title: nullable(stringArg()),
				todoId: nonNull(stringArg()),
			},

			resolve: updateTodo,
		});
	},
});
