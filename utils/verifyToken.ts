import jwt from 'jsonwebtoken';

if (!process.env.JWTSECRET) {
	console.warn('not jwt secret key');
}

interface Payload extends jwt.JwtPayload {
	id: string;
	name: string;
	email: string;
	iat: number;
	exp: number;
}

export default function verifyToken(token: string) {
	return new Promise<Payload>((resolve, reject) => {
		jwt.verify(
			token,
			process.env.JWTSECRET as string,
			{
				complete: true,
			},
			(err, decode) => {
				if (err) {
					reject('Invalid or user expired');
				}

				resolve(decode?.payload as Payload);
			}
		);
	});
}
