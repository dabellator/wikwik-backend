import { AuthenticationError } from 'apollo-server-errors'
import { extendType, enumType, objectType, intArg, stringArg } from 'nexus'

export const Exercise = objectType({
  name: 'Exercise',
  definition(t) {
    t.int('id')
    t.string('created_at')
    t.string('name')
    t.list.field('fields', {
      type: ExerciseField,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.exerciseField
          .findMany({
            where: {
              exercise_id: parent.id
            }
          })
      }
    })
  }
})

export const ExerciseField = objectType({
  name: 'ExerciseField',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('label')
    t.field('type', { type: ExerciseFieldType })
    t.list.string('options', {
      async resolve(parent, _args, ctx) {
        const results = await ctx.prisma.exerciseFieldOption
          .findMany({
            where: {
              exercise_field_id: parent.id
            },
            select: {
              value: true,
            }
          })
        return results.map((obj) => obj.value);
      }
    })
  }
})

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nonNull.list.nonNull.field('initial_exercises', { type: Exercise })
  }
})

export const ExerciseFieldType = enumType({
  name: 'ExerciseFieldType',
  members: [
    'STRING',
    'INTEGER',
    'SELECT',
    'ARRAY',
    'HIDDEN',
    'REFERENCE',
    'CONTENT',
    'DEPENDANT',
    'SKIP',
    'REPEAT',
  ],
})
// Handle onboarding here - or should it be a part of organization?
// Handle Exercise fetching (CRUD)

export const ExerciseQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('organization', {
      type: Organization,
      args: {
        org_name: stringArg({ default: 'default' }),
      },
      async resolve(_parent, args, { prisma }) {
        let queryResult = null;
        try {
          queryResult = await prisma.organization.findUnique({
            where: {
              name: args.org_name,
            },
            include: {
              initial_exercises: true,
            },
          })
          const orderedExercises = queryResult.exercise_order.map(exerciseName => {
            return queryResult.initial_exercises.find(exercise => exercise.name === exerciseName);
          })

          const newQuery = Object.assign({}, queryResult, {initial_exercises: orderedExercises});
          return newQuery;
        } catch(e) {
          throw new AuthenticationError('Onboard not found.');
        }
      }
    }),
    t.field('exercise', {
      type: Exercise,
      args: {
        id: intArg(),
      },
      async resolve(_parent, args, { prisma }) {
        let  queryResult = null;
        try {
          queryResult = await prisma.exercise.findUnique({
            where: {
              id: args.id
            }
          });
          return queryResult;
        } catch(e) {
          throw new AuthenticationError('Exercise not found.');
        }
      }
    })
  }
})
