import type { User } from '@prisma/client'

import { logger } from 'src/lib/logger'

const recovery = {
  subject: () => 'Forgot Password',
  text: (user: User) => {
    const link = `${process.env.DOMAIN}/reset-password?resetToken=${user.resetToken}`
    const appName = process.env.APP_NAME

    logger.debug(link)

    return `
        <div> Hi ${userNameWithFallback(user)}, </div>
        <p>Please find below a link to reset your password for the ${appName}:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request an account, please ignore this email.</p>
      `
  },
}

// TODO: extract to utils that can be shared with api and web
const userNameWithFallback = (user: User) => {
  return user.name || user.nickname || user.email
}

export { recovery }
