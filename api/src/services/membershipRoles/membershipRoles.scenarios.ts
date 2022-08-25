import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MembershipRoleCreateArgs>({
  membershipRole: {
    one: {
      data: {
        membership: {
          create: {
            user: {
              create: {
                email: 'String66669',
                hashedPassword: 'String',
                salt: 'String',
                createdAt: '2022-08-17T12:40:29Z',
              },
            },
            team: {
              create: { name: 'String', updatedAt: '2022-08-17T12:40:29Z' },
            },
          },
        },
        role: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        membership: {
          create: {
            user: {
              create: {
                email: 'String3840653',
                hashedPassword: 'String',
                salt: 'String',
                createdAt: '2022-08-17T12:40:29Z',
              },
            },
            team: {
              create: { name: 'String', updatedAt: '2022-08-17T12:40:29Z' },
            },
          },
        },
        role: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
