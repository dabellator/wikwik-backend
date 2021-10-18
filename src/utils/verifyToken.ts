import jwt, { JwtPayload, VerifyOptions } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export const verifyToken = async ( bearerToken: string ): Promise<JwtPayload> => {
  const client = jwksClient({
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  });

  const getJwksClientKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  }

  const options: VerifyOptions  = {
    audience: process.env.AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN, 
    algorithms: ['RS256'],
  };

  return new Promise((res, rej) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      options,
      (err, decoded) => {
        if (err) rej(err);
        res(decoded)
      },
    );
  });
};

