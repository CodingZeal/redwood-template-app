import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'String', active: true } },
    two: { data: { name: 'String', active: true } },
  },
})

export type StandardScenario = typeof standard
