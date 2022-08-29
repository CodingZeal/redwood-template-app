import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String4589593',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        email: 'String1300967',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
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
    inUseUser: (): Prisma.UserCreateArgs => ({
      data: {
        email: 'inUseUser@example.com',
        hashedPassword: 'xxxx',
        salt: 'pepper',
      },
    }),
    notInUseUser: (): Prisma.UserCreateArgs => ({
      data: {
        email: 'notInUseUser@example.com',
        hashedPassword: 'xxxx',
        salt: 'pepper',
      },
    }),
  },
  membership: {
    membership1: (scenario): Prisma.MembershipCreateArgs => ({
      data: {
        teamId: scenario.team.team1.id,
        userId: scenario.user.inUseUser.id,
      },
    }),
  },
}

export type StandardScenario = typeof standard
export type InUseScenario = {
  user: Record<string, Prisma.UserCreateArgs['data']>
  team: Record<string, Prisma.TeamCreateArgs['data']>
}
