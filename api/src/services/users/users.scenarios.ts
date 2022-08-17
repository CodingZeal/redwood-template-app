import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String4589593',
        hashedPassword: 'String',
        salt: 'String',
        createdAt: '2022-08-17T12:38:46Z',
      },
    },
    two: {
      data: {
        email: 'String1300967',
        hashedPassword: 'String',
        salt: 'String',
        createdAt: '2022-08-17T12:38:46Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
