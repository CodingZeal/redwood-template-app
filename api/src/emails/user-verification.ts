import type { User } from '@prisma/client'

import { logger } from 'src/lib/logger'

const email = {
  subject: () => 'Verify Email',
  htmlBody: (user: User) => {
    const link = `${process.env.DOMAIN}/verification?verifyToken=${user.verifyToken}`
    const appName = process.env.APP_NAME

    if (process.env.NODE_ENV === 'development') {
      logger.debug(link)
    }

    return `
        <div> Hi ${userNameWithFallback(user)}, </div>
        <p>Please find below a link to verify your email for the ${appName}:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request an account, please ignore this email.</p>
      `
  },
}

// TODO: extract to utils that can be shared with api and web
const userNameWithFallback = (user: User) => {
  return user.name || user.nickname || user.email
}

export { email }
