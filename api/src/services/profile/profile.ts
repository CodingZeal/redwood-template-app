import { randomUUID } from 'node:crypto'

import * as CryptoJS from 'crypto-js'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { ValidationError } from '@redwoodjs/graphql-server'

import { email as emailUpdate } from 'src/emails/user-verification'
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/mailer'

export const profile: QueryResolvers['profile'] = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const updateProfile: MutationResolvers['updateProfile'] = async ({
  input,
}) =>
  await db.user.update({
    data: input,
    where: { id: context.currentUser.id },
  })

export const updatePassword: MutationResolvers['updatePassword'] = async ({
  input,
}) => {
  const { existingPassword, newPassword, confirmPassword } = input

  validate(existingPassword, 'Existing Password', {
    presence: { allowEmptyString: false },
  })
  validate(newPassword, 'New Password', {
    presence: { allowEmptyString: false },
  })
  validate(confirmPassword, 'Confirm Password', {
    presence: { allowEmptyString: false },
  })

  if (newPassword != confirmPassword) {
    throw new ValidationError(
      'Your new password does not match the confirmation password'
    )
  }

  const user = await db.user.findFirstOrThrow({
    where: { id: context.currentUser.id },
  })
  const existingPasswordHashed = CryptoJS.PBKDF2(existingPassword, user.salt, {
    keySize: 256 / 32,
  }).toString()

  if (existingPasswordHashed != user.hashedPassword) {
    throw new ValidationError('Your existing password is not correct')
  }

  const newSalt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  const newHashedPassword = CryptoJS.PBKDF2(newPassword, newSalt, {
    keySize: 256 / 32,
  }).toString()

  await db.user.update({
    data: {
      hashedPassword: newHashedPassword,
      salt: newSalt,
    },
    where: { id: context.currentUser.id },
  })

  return true
}

export const verifyEmail: MutationResolvers['verifyEmail'] = async ({
  token,
}) => {
  if (token === null) return true
  const user = await db.user.findFirst({
    where: { verifyToken: token },
  })
  if (user) {
    await db.user.update({
      where: { id: user.id },
      data: {
        verifyToken: null,
      },
    })
    return true
  } else {
    return false
  }
}

export const updateEmail: MutationResolvers['updateEmail'] = async ({
  input,
}) => {
  const { password, newEmail } = input

  validate(password, 'Existing Password', {
    presence: { allowEmptyString: false },
  })
  validate(newEmail, 'New Email', {
    presence: { allowEmptyString: false },
  })
  const user = await db.user.findFirstOrThrow({
    where: { id: context.currentUser.id },
  })
  const existingPasswordHashed = CryptoJS.PBKDF2(password, user.salt, {
    keySize: 256 / 32,
  }).toString()

  if (existingPasswordHashed != user.hashedPassword) {
    throw new ValidationError('Your existing password is not correct')
  }
  const profile = await db.user.update({
    where: { id: context.currentUser.id },
    data: {
      verifyToken: randomUUID(),
      email: newEmail,
    },
  })
  await sendEmail({
    to: profile.email,
    subject: emailUpdate.subject(),
    html: emailUpdate.htmlBody(profile),
  })

  return true
}
