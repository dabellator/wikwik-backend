import {
  arg,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
} from "nexus";

export const ResponseValue = objectType({
  name: 'ResponseValue',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('value')
    t.int('response_id')
  }
});

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.int('id')
    t.int('identity_id')
    t.int('exercise_id')
    t.list.field('values', {
      type: ResponseValue,
      // async resolve(parent, _args, { prisma }) {
      //   return await prisma.responseValue.findMany({
      //     where: {
      //       response_id: parent.id
      //     }
      //   })
      // }
    })
  }
});

export const ResponseValueInput = inputObjectType({
  name: 'ResponseValueInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('value')
  }
})

export const ResponseQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getMyResponses', {
      type: list('Response'),
      async resolve(_root, _args, { prisma, isAuthenticated, authID, anonID }) {
        return await prisma.response.findMany({
          where: {
            identity_id: isAuthenticated ? authID : anonID,
          },
          include: {
            values: true,
          },
        });
      }
    })
  }
})

// Handle Response Mutation
export const ResponseMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('createResponse', {
      type: 'Response',
      args: {
        values: list(arg({ type: ResponseValueInput })),
        exercise: nonNull(intArg()),
      },
      async resolve(_root, args, { prisma, isAuthenticated, authID, anonID }) {
        const response = await prisma.response.create({
          data: {
            identity_id: isAuthenticated ? authID : anonID,
            exercise_id: args.exercise,
            values: {
              createMany: {
                data: args.values,
              },
            },
          },
          include: {
            values: true,
          },
        })

        return response;
      }
    })
  }
});
