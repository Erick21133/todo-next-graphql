import { FieldResolver } from 'nexus';
import nookies from 'nookies';
import { encodedToken } from '@utils';
import bcrypt from 'bcrypt';

export const loginResolver: FieldResolver<'Mutation', 'Login'> = async (
	_,
	args: { email: string; password: string },
	{ res, prisma }
) => {
	try {
		// validate email and password

		if (args.password?.length < 8) {
			throw new Error('Password too short');
		}

		if (!args.email.includes('@') || !args.email.includes('.com')) {
			throw new Error('Invalid email');
		}

		// validate if user exists

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				email: args.email,
			},

			select: {
				id: true,
				name: true,
				email: true,
				password: true,
			},
		});

		const passwordMatch = await bcrypt.compare(args.password, user.password);
		if (!passwordMatch) throw new Error('Invalid password');

		const token = await encodedToken(
			{
				email: user.email,
				name: user.name,
				id: user.id,
			},
			{
				expiresIn: '24h',
			}
		);

		nookies.set({ res }, 'sid', token, {
			maxAge: 24 * 60 * 60,
			httpOnly: false,
			secure: false,
			path: '/',
		});

		return {
			error: false,
			name: 'Testing User',
			email: 'testing@gmail.com',
		};
	} catch (err) {
		throw new Error(err?.message);
	}
};

export const registerResolver: FieldResolver<'Mutation', 'Register'> = async (
	_,
	args: { email: string; password: string; name: string },
	{ res, prisma }
) => {
	try {
		if (args.password.length < 8) throw new Error('password too short');

		if (!args.email.includes('@') || !args.email.includes('.com')) {
			throw new Error('Invalid email');
		}

		const encrypted = await bcrypt.hash(
			args.password,
			'$2b$12$0dRiyoPQyjGUmMdYkbII7.' // i know this is bad i have to put in env variables i will change later i was running late
		);

		const prevExisted = await prisma.user.findUnique({
			where: {
				email: args.email,
			},

			select: {
				id: true,
			},
		});

		if (prevExisted?.id) throw new Error('Email address already exists');

		const user = await prisma.user.create({
			data: {
				email: args.email,
				name: args.name,
				password: encrypted,
			},
		});

		const token = await encodedToken(
			{
				email: user.email,
				name: user.name,
				id: user.id,
			},
			{
				expiresIn: '24h',
			}
		);

		nookies.set({ res }, 'sid', token, {
			maxAge: 24 * 60 * 60,
			httpOnly: false,
			secure: false,
			path: '/',
		});

		return user;
	} catch (err) {
		throw new Error(err?.message);
	}
};
