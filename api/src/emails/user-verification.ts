import type { User } from '@prisma/client'

import { logger } from 'src/lib/logger'
import { userNameWithFallback } from 'src/lib/username'

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
        <p>If you did not request this action, please ignore this email.</p>
      `
  },
}

export { email }
