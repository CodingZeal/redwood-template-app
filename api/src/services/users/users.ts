import { randomUUID } from 'node:crypto'

import type { User as UserType } from '@prisma/client'
import * as CryptoJS from 'crypto-js'
import type {
  MutationResolvers,
  QueryResolvers,
  UserResolvers,
} from 'types/graphql'

import { email as createPassword } from 'src/emails/create-password'
import { email as verificationEmail } from 'src/emails/user-verification'
import { buildWhereClause } from 'src/lib/buildWhereClause'
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/mailer'

const parseRoles = (roleIds) =>
  roleIds?.reduce((acc, id) => {
    const [teamId, roleId] = id.split(',')
    acc[teamId] = [...(acc[teamId] || []), roleId]
    return acc
  }, {})

export const users: QueryResolvers['users'] = (args: { active: boolean }) => {
  return db.user.findMany(buildWhereClause(args))
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

  const resetToken = randomUUID()
  const resetTokenExpiresAt = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000
  )

  const { roleIds, teamIds, ...userInput } = input
  const user = await db.user.create({
    data: {
      ...userInput,
      hashedPassword,
      resetToken,
      resetTokenExpiresAt,
      salt,
    },
  })
  await createMembershipAndRolesIfNotExists(user, teamIds, roleIds)

  await sendEmail({
    to: user.email,
    subject: createPassword.subject(),
    html: createPassword.htmlBody(user),
  })

  return user
}

export const updateUser: MutationResolvers['updateUser'] = async ({
  id,
  input,
}) => {
  const { roleIds, teamIds, ...userInput } = input
  const user = await db.user.update({
    data: { ...userInput },
    where: { id },
  })
  await createMembershipAndRolesIfNotExists(user, teamIds, roleIds)

  if (teamIds) {
    await db.membership.deleteMany({
      where: { userId: user.id, NOT: { teamId: { in: teamIds } } },
    })
  }

  return user
}

export const removeUser: MutationResolvers['removeUser'] = async ({ id }) => {
  const user = await db.user.update({
    where: { id },
    data: {
      email: id,
      name: 'Removed User',
      nickname: null,
      pronouns: null,
      active: false,
      admin: false,
    },
  })
  return user
}

export const verifyReset: MutationResolvers['verifyReset'] = async ({
  email,
}) => {
  const user = await db.user.findUnique({
    where: { email },
  })
  if (user?.verifyToken) {
    sendEmail({
      to: user.email,
      subject: verificationEmail.subject(),
      html: verificationEmail.htmlBody(user),
    })
  }
  return email
}

export const User: UserResolvers = {
  memberships: (_obj, { root }) =>
    db.membership.findMany({ where: { userId: root.id } }),
}

const createMembershipAndRolesIfNotExists = async (
  user: UserType,
  teamIds: string[],
  roleIds: string[]
): Promise<void> => {
  for (const teamId of teamIds || []) {
    const membership = await db.membership.upsert({
      where: {
        userTeamConstraint: { teamId, userId: user.id },
      },
      create: { teamId, userId: user.id },
      update: {},
    })

    for (const roleId of parseRoles(roleIds)[teamId] || []) {
      await db.membershipRole.upsert({
        where: {
          membershipRoleConstraint: { membershipId: membership.id, roleId },
        },
        create: { membershipId: membership.id, roleId },
        update: {},
      })
    }
  }
}
