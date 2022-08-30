import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.RoleCreateArgs>({
  role: {
    one: { data: { name: 'ONE' } },
    two: { data: { name: 'TWO' } },
  },
})

export const inUse = {
  team: {
    team1: (): Prisma.TeamCreateArgs => ({
      data: {
        name: 'Team1',
      },
    }),
  },
  user: {
    user1: (): Prisma.UserCreateArgs => ({
      data: {
        email: 'user1@example.com',
        hashedPassword: 'xxxx',
        salt: 'pepper',
      },
    }),
  },
  role: {
    notInUseRole: (): Prisma.RoleCreateArgs => ({
      data: {
        name: 'NOT-IN-USE',
      },
    }),
    inUseRole: (scenario): Prisma.RoleCreateArgs => ({
      data: {
        name: 'IN-USE',
        membershipRoles: {
          create: {
            membership: {
              create: {
                userId: scenario.user.user1.id,
                teamId: scenario.team.team1.id,
              },
            },
          },
        },
      },
    }),
  },
}

export type StandardScenario = typeof standard
export type InUseScenario = {
  role: Record<string, Prisma.RoleCreateArgs['data']>
}
