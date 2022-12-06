import { Prisma } from '@prisma/client'
import * as CryptoJS from 'crypto-js'

const hashPassword = (password, salt) => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
  }).toString()
}

const salt = 'pepper'

export const defaultProfilePassword = 'Password$1'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    profile: {
      data: {
        email: 'String4589593',
        name: 'Harry',
        nickname: 'Scar',
        pronouns: 'he/him',
        salt,
        hashedPassword: hashPassword(defaultProfilePassword, salt),
        verifyToken: 'Tolkien',
      },
    },
  },
})

export type StandardScenario = typeof standard
