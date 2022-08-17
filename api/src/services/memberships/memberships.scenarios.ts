import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MembershipCreateArgs>({
  membership: {
    one: {
      data: {
        user: {
          create: {
            email: 'String7121863',
            hashedPassword: 'String',
            salt: 'String',
            createdAt: '2022-08-17T12:39:56Z',
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-08-17T12:39:56Z' } },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String7753243',
            hashedPassword: 'String',
            salt: 'String',
            createdAt: '2022-08-17T12:39:56Z',
          },
        },
        team: { create: { name: 'String', updatedAt: '2022-08-17T12:39:56Z' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
