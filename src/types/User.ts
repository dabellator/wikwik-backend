// /graphql/types/User.ts
import { enumType, extendType, intArg, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('created_at')
    t.string('first_name')
    t.string('last_name')
    t.string('platform_id')
    t.string('platform')
    t.boolean('main')
    t.int('main_id')
    t.int('utc_hour')
    t.int('organization_id')
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

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        id: intArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null;
        if (args.id) {
          queryResults = await ctx.prisma.user.findUnique({
            where: {
              id: args.id
            }
          })
          return queryResults;
        } else {
          queryResults = await ctx.prisma.user.findMany({
            orderBy: {
              id: 'asc'
            }
          })
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
