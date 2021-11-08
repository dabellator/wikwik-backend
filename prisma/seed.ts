import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const exerciseData: Prisma.ExerciseCreateInput[] = [{
  name: 'Intention',
  fields: { create: [{
    name: 'content',
    label: 'Hi. \n Welcome to wikwik.',
    type: 'CONTENT',
  },{
    name: 'content',
    label: 'You\'re here to discover what you\'re looking for.',
    type: 'CONTENT',
  },{
    name: 'content',
    label: 'Let\s get started.',
    type: 'CONTENT',
  },{
    name: 'Intention',
    label: 'What do you want?',
    type: 'STRING',
  },{
    name: 'noKnow',
    label: 'Asking for help is the most important step of this process! Why are \
    you having a hard time with this step?',
    type: 'SELECT',
    options: { create: [
      {value: 'I don\'t understand the exercise'},
      {value: 'I don\'t know what I want'},
      {value: 'The app bothers me'},
      {value: 'I\'d like to talk to someone about this'},
    ]}
  }]}
}, {
  name: 'Reason',
  fields: { create: [{
    name: 'content',
    label: 'It\'s important to understand why we want the things we want.',
    type: 'CONTENT',
  },{
    name: 'content',
    label: 'It helps us stay on the right path and not get distracted.',
    type: 'CONTENT',
  },,{
    name: 'Reason',
    label: 'Why are you pursuing this Intention?',
    type: 'STRING',
  },{
    name: 'noKnow',
    label: 'Asking for help is the most important step of this process! Why are \
    you having a hard time with this step?',
    type: 'SELECT',
    options: { create: [
      {value: 'I don\'t understand the exercise'},
      {value: 'I don\'t know why I\'m pursuing this goal'},
      {value: 'I need more time to think about it'},
      {value: 'I\'d like to talk to someone about this'},
    ]}
  }]}
}, {
  name: 'Impact',
  fields: { create: [{
    name: 'content',
    label: 'Now let\'s think about how your life will change when you pursue this Intention.',
    type: 'CONTENT',
  },{
    name: 'content',
    label: 'Imagine how it will affect you and those around you.',
    type: 'CONTENT',
  },,{
    name: 'Impact',
    label: 'What will be the impact of this Intention?',
    type: 'STRING',
  },{
    name: 'noKnow',
    label: 'Asking for help is the most important step of this process! Why are \
    you having a hard time with this step?',
    type: 'SELECT',
    options: { create: [
      {value: 'I don\'t understand the exercise'},
      {value: 'I can\'t think that far into the future'},
      {value: 'I don\'t see how this will be helpful'},
      {value: 'I\'d like to talk to someone about this'},
    ]}
  }]}
}, {
  name: 'Blocker',
  fields: { create: [{
    name: 'content',
    label: 'Definining what is holding you back is always the first step to breaking through.',
    type: 'CONTENT',
  },{
    name: 'content',
    label: 'Let\'s discover what\'s standing in your way right now.',
    type: 'CONTENT',
  },,{
    name: 'Blocker',
    label: 'What is your biggest blocker?',
    type: 'STRING',
  },{
    name: 'noKnow',
    label: 'Asking for help is the most important step of this process! Why are \
    you having a hard time with this step?',
    type: 'SELECT',
    options: { create: [
      {value: 'I don\'t understand the exercise'},
      {value: 'I\'m not sure what\'s blocking me'},
      {value: 'I don\'t want to focus on the negative'},
      {value: 'I\'d like to talk to someone about this'},
    ]}
  }]}
}, {
  name: 'Accomplishment',
  fields: { create: [{
    name: 'content',
    label: 'You might not feel like you\'ve done anything towards achieving your goal, but you have!',
    type: 'CONTENT',
  },{
    name: 'content',
    label: 'Even starting with wikwik is a step, and there are definitely more.',
    type: 'CONTENT',
  },,{
    name: 'Accomplishment',
    label: 'What has been the biggest accomplishment towards your goal so far?',
    type: 'STRING',
  },{
    name: 'noKnow',
    label: 'Asking for help is the most important step of this process! Why are \
    you having a hard time with this step?',
    type: 'SELECT',
    options: { create: [
      {value: 'I don\'t understand the exercise'},
      {value: 'I don\'t think I\'ve made any accomplishments'},
      {value: 'I don\'t know what counts as a success'},
      {value: 'I\'d like to talk to someone about this'},
    ]}
  }]}
}];

async function main() {
  const exercises = await Promise.all(exerciseData.map(async ed => {
    return await prisma.exercise.create({
      data: ed,
    });
  }))

  console.log(exercises)

  const organization = await prisma.organization.create({
    data: {
      name: 'default',
      exercise_order: [
        'Intention',
        'Reason',
        'Impact',
        'Blocker',
        'Accomplishment',
      ],
      initial_exercises: {
        connect: exercises.map(ex => ({id: ex.id})),
      },
    },
  });

  console.log(organization);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
