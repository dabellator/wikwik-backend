import { AuthenticationError } from 'apollo-server-errors'
import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { verifyToken } from '../utils/verifyToken'

export const Identity = objectType({
  name: 'Identity',
  definition(t) {
    t.int('id')
    t.string('first_name')
    t.string('last_name')
    t.string('platform_id') // This is where I need to store either the anonId or the sub id
    t.string('platform')
    t.boolean('main')
    t.int('main_id')
    t.int('utc_hour')
    t.int('organization_id')
    t.list.field('identity_props', {
      type: IdentityProps,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.identityProp
          .findMany({
            where: {}
          })
      }
    })
  },
})

export const IdentityProps = objectType({
  name: 'IdentityProps',
  definition(t) {
    t.int('id')
    t.string('value')
    t.string('type')
    t.string('name')
    t.int('identityId')
  }
})
// How to handle apollo upsert - https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
export const IdentityQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('identity', {
      type: 'Identity',
      async resolve(_parent, _args, { isAuthenticated, prisma }) {
        let  queryResult = null;
        try {
          const isAuthed = await isAuthenticated;
          queryResult = await prisma.identity.findUnique({
            where: {
              email: 'jordanbundy@gmail.com'
            }
          });
          return queryResult;
        } catch(e) {
          throw new AuthenticationError('You must be logged in to do this');
        }
      }
    })
  }
})

export const IdentityMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createAnonymousUser', {
      type: Identity,
      async resolve(_parent, _args, { prisma }) {
        let queryResult = null;
        try {
          queryResult = await prisma.identity.create({
            data: {
              // I don't think we need to pass anything in just yet
            }
          })
          return queryResult;
        } catch(e) {
          throw new Error(e)
        }
      }
    }),
    t.field('updateIdentityAuthentication', {
      type: Identity,
      args: { authToken: nonNull(stringArg()), anonID: nonNull(stringArg())},
      async resolve(_parent, { authToken, anonID }, { prisma }) {
        const { sub } = await verifyToken(authToken);
        try {
          const identity = await prisma.identity.findUnique({
            where: { platform_id: sub },
          })
          if (!identity) {
            const newIdentity = await prisma.identity.upsert({
              where: { platform_id: anonID },
              update: {
                platform_id: sub
              },
              create: {
                platform_id: sub
              }
            })

            return newIdentity;
          }
          return identity;
        } catch(e) {
          throw new Error(e)
        }
      }
    })
  }
})
