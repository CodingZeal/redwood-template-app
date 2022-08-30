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

export const createUser: MutationResolvers['createUser'] = async ({
  input,
}) => {
  // create new users with random password
  const password = CryptoJS.lib.WordArray.random(20).toString()
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  const hashedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
  }).toString()

  const { teamIds, ...userInput } = input
  const user = await db.user.create({
    data: { ...userInput, salt, hashedPassword },
  })
  teamIds?.forEach(async (teamId) => {
    await db.membership.create({
      data: { teamId, userId: user.id },
    })
  })
  return user
}

export const updateUser: MutationResolvers['updateUser'] = async ({
  id,
  input,
}) => {
  const { teamIds, ...userInput } = input
  const user = await db.user.update({
    data: { ...userInput },
    where: { id },
  })
  for (const teamId of teamIds || []) {
    await db.membership.upsert({
      where: {
        userTeamConstraint: {
          teamId,
          userId: user.id,
        },
      },
      create: {
        teamId,
        userId: user.id,
      },
      update: {},
    })
  }
  if (teamIds) {
    await db.membership.deleteMany({
      where: { userId: user.id, NOT: { teamId: { in: teamIds } } },
    })
  }
  return user
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  memberships: (_obj, { root }) =>
    db.membership.findMany({ where: { userId: root.id } }),
}
