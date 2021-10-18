// /graphql/types/User.ts
import { AuthenticationError } from 'apollo-server-errors'
import { enumType, extendType, intArg, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('created_at')
    t.string('first_name')
    t.string('last_name')
    t.string('platform_id') // This is where I need to store either the anonId or the sub id
    t.string('platform')
    t.boolean('main')
    t.int('main_id')
    t.int('utc_hour')
    t.int('organization_id')
    t.list.field('user_props', {
      type: UserProps,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.userProps
          .findMany({
            where: {}
          })
      }
    })
  },
})

export const UserProps = objectType({
  name: 'UserProps',
  definition(t) {
    t.int('id')
    t.string('value')
    t.string('type')
    t.string('name')
    t.int('userId')
  }
})
// How to handle apollo upsert - https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      async resolve(_parent, _args, { isAuthenticated, prisma }) {
        let  queryResult = null;
        try {
          const isAuthed = await isAuthenticated;
          queryResult = await prisma.user.findUnique({
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

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.int('id')
  },
})
