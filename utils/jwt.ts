import jwt from 'jsonwebtoken';

if (!process.env.JWTSECRET) {
	console.warn('not jwt secret key');
}

const createToken = (payload: string | object, options: jwt.SignOptions) => {
	return new Promise<string>((resolve, reject) => {
		jwt.sign(payload, process.env.JWTSECRET as string, options, (err, decode) => {
			if (err) {
				reject(err);
			}

			resolve(decode as string);
		});
	});
};

export default createToken;
