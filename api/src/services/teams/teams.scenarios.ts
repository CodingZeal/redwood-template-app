import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'ONE', active: true } },
    two: { data: { name: 'TWO', active: true } },
  },
})

export const associations = {
  team: {
    withUser: (): Prisma.TeamCreateArgs => ({
      data: {
        name: 'User-Team',
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
        teamId: scenario.team.withUser.id,
        userId: scenario.user.user1.id,
      },
    }),
  },
}

export type StandardScenario = typeof standard
export type AssociationsScenario = {
  team: Record<string, Prisma.TeamCreateArgs['data']>
}
