import type { User } from '@prisma/client'

export const userNameWithFallback = (user: User) => {
  return user.name || user.nickname || user.email
}
