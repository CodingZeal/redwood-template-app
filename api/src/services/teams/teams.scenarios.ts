import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'String', updatedAt: '2022-08-17T12:41:26Z' } },
    two: { data: { name: 'String', updatedAt: '2022-08-17T12:41:26Z' } },
  },
})

export type StandardScenario = typeof standard
