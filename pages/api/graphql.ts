import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import { schema } from '../../graphql/schema';
import { cors } from '@utils';

export type Context = {
	prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({
	schema,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ req, res, prisma }),
});

export default cors(handler);
