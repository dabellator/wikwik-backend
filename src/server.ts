import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './utils/verifyToken';

export type Context = {
  prisma: PrismaClient
  isAuthenticated: boolean
  authID: number
  anonID: number
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    let isAuthenticated = false;
    let authID;
    let anonID;
    // need to manage current user vs anon
    try {
      const authHeader: string = req.headers.authorization || '';
      const anonHeader: string = req.headers['x-anon-id'] as string || '';
      if (authHeader) {
        const [ _type, token ] = authHeader.split(' ');

        const payload = await verifyToken(token);
        isAuthenticated = payload ? true : false;
        const authIdentity = await prisma.identity.findUnique({
          where: { platform_id: payload.sub },
        })
        authID = authIdentity?.id;
      } else if (anonHeader) {
        const anonIdentity = await prisma.identity.upsert({
          where: { platform_id: anonHeader },
          update: {},
          create: {
            platform_id: anonHeader
          }
        })
        anonID = anonIdentity.id;

        res.header('Set-Cookie', `id=${anonHeader}; Max-Age=2592000;`)
      }
      res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    } catch(e) {
      throw new Error(e);
    }
  
    return {
      isAuthenticated,
      authID,
      anonID,
      prisma,
    };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
  `)
})
