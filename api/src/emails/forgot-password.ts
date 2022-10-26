import type { User } from '@prisma/client'

import { logger } from 'src/lib/logger'
import { userNameWithFallback } from 'src/lib/username'

const email = {
  subject: () => 'Forgot Password',
  text: (user: User) => {
    const link = `${process.env.DOMAIN}/reset-password?resetToken=${user.resetToken}`
    const appName = process.env.APP_NAME

    logger.debug(link)

    return `
        <div> Hi ${userNameWithFallback(user)}, </div>
        <p>Please find below a link to reset your password for ${appName}:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request to reset your password, please ignore this email.</p>
      `
  },
}

export { email }
