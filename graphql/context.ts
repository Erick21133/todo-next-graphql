import { PrismaClient } from '.prisma/client';
import prisma from '../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServerResponse } from 'http';

export type Context = {
	prisma: PrismaClient;
	req: NextApiRequest;
	res: NextApiResponse | ServerResponse;
};

export async function createContext(req: any, res: any): Promise<Context> {
	return {
		prisma,
		req,
		res,
	};
}
