import * as CryptoJS from 'crypto-js'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  // create new users with random password
  const password = CryptoJS.lib.WordArray.random(20).toString()
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
  }).toString()

  return db.user.create({
    data: { ...input, salt, hashedPassword },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  membership: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).membership(),
}
