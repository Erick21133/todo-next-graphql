import { FieldResolver } from 'nexus';

import { verifyToken } from '@utils';

export const getTodos: FieldResolver<'Query', 'Todo'> = async (
	_,
	args: { token: string },
	{ prisma }
) => {
	try {
		const token = await verifyToken(args.token);

		return prisma.todo.findMany({
			where: {
				user_id: token?.id,
			},

			select: {
				id: true,
				title: true,
				description: true,
				status: true,
				createdAt: true,
			},

			orderBy: {
				updatedAt: 'desc',
			},
		});
	} catch (err) {
		throw new Error(err?.message);
	}
};

export const createTodo: FieldResolver<'Mutation', 'Todo'> = async (
	_,
	args: {
		token: string;
		status: boolean | null;
		description: string | null;
		title: string;
	},
	{ prisma }
) => {
	try {
		const token = await verifyToken(args.token);

		return prisma.todo.create({
			data: {
				title: args.title,
				description: args.description,
				user_id: token?.id,
				status: args.status as boolean,
			},
		});
	} catch (err) {
		throw new Error(err?.message);
	}
};

export const deleteTodo: FieldResolver<'Mutation', 'Todo'> = async (
	_,
	args: {
		token: string;
		todoId: string;
	},
	{ prisma }
) => {
	try {
		const token = await verifyToken(args.token);

		await prisma.todo.findFirstOrThrow({
			where: {
				AND: [
					{
						user_id: token?.id,
					},
					{
						id: args.todoId,
					},
				],
			},
		});

		return await prisma.todo.delete({
			where: {
				id: args.todoId,
			},
		});
	} catch (err) {
		throw new Error(err?.message);
	}
};

export const updateTodo: FieldResolver<'Mutation', 'Todo'> = async (
	_,
	args: {
		token: string;
		status: boolean | null;
		description: string | null;
		title: string;
		todoId: string;
	},
	{ prisma }
) => {
	try {
		const token = await verifyToken(args.token);

		await prisma.todo.findFirstOrThrow({
			where: {
				AND: [
					{
						id: args.todoId,
					},
					{
						user_id: token?.id,
					},
				],
			},
		});

		return await prisma.todo.update({
			where: {
				id: args.todoId,
			},
			data: {
				status: args.status as boolean,
				description: args.description,
				title: args.title,
			},
		});
	} catch (err) {
		throw new Error(err?.message);
	}
};
