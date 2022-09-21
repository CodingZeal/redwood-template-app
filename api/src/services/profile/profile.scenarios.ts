import { Prisma } from '@prisma/client'

const DEFAULT_FIELDS = {
  hashedPassword: 'xxxx',
  salt: 'pepper',
}

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    profile: {
      data: {
        email: 'String4589593',
        name: 'Harry',
        nickname: 'Scar',
        pronouns: 'he/him',
        ...DEFAULT_FIELDS,
      },
    },
  },
})

export type StandardScenario = typeof standard
