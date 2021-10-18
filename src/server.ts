import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './utils/verifyToken';

export type Context = {
  prisma: PrismaClient
  isAuthenticated: boolean
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let isAuthenticated = false;
    let authId = '';
    // need to manage current user
    try {
      const authHeader = req.headers.authorization || '';
      if (authHeader) {
        const auths = authHeader.split(' ')[1];
        if (auths[0] === 'Anon') {
          isAuthenticated = false;
          authId = auths[1];
        } else {
          const payload = await verifyToken(auths[1]);
          isAuthenticated = payload ? true : false;
          authId = payload.sub;
        }
      }
    } catch(e) {
      throw new Error(e);
    }
  
    return {
      isAuthenticated,
      authId,
      prisma,
    };
  },
});

server.listen().then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
  `)
})
