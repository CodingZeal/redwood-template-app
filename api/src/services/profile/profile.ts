import * as CryptoJS from 'crypto-js'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

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

  return {
    existingPassword: null,
    newPassword: null,
    confirmPassword: null,
  }
}
