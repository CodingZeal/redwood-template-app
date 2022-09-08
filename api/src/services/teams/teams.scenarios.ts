import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'ONE', active: true } },
    two: { data: { name: 'TWO', active: true } },
  },
})

export const associations = {
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
  membership: {
    membership1: (scenario): Prisma.MembershipCreateArgs => ({
      data: {
        teamId: scenario.team.team1.id,
        userId: scenario.user.user1.id,
      },
    }),
  },
}

export type StandardScenario = typeof standard
export type AssociationsScenario = {
  team: Record<string, Prisma.TeamCreateArgs['data']>
}
