import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import Chance from 'chance'
import CryptoJS from 'crypto-js'

function hashPassword(password: string, salt = 'ZEAL') {
  const saltToUse = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()
  return [
    CryptoJS.PBKDF2(password, saltToUse, { keySize: 256 / 32 }).toString(),
    saltToUse,
  ]
}

const {
  ADMIN_EMAIL = 'admin@example.com',
  ADMIN_PASSWORD = 'password',
  USERS_PASSWORD = 'password',
} = process.env

const [ADMIN_HASHED_PASSWORD, ADMIN_SALT] = hashPassword(ADMIN_PASSWORD)
const [USERS_HASHED_PASSWORD, USERS_SALT] = hashPassword(USERS_PASSWORD)

const chance = new Chance('ZEAL')

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateUser(
  override?: Prisma.UserCreateInput
): Prisma.UserCreateInput {
  return {
    name: chance.name(),
    nickname: chance.word(),
    pronouns: pickRandom(['he/him', 'she/her', 'they/them', 'it/its']),
    email: chance.email(),
    hashedPassword: USERS_HASHED_PASSWORD,
    salt: USERS_SALT,
    ...override,
  }
}

async function _upsertUser(user) {
  return db.user.upsert({
    where: {
      email: user.email,
    },
    update: {
      ...user,
    },
    create: {
      ...user,
    },
  })
}

export default async () => {
  try {
    const users = [
      generateUser({
        admin: true,
        email: ADMIN_EMAIL,
        hashedPassword: ADMIN_HASHED_PASSWORD,
        salt: ADMIN_SALT,
      }),
      ...Array(5).map(() => generateUser()),
    ]

    const team1 = await db.team.create({
      data: {
        name: 'team 1',
      },
    })

    const team2 = await db.team.create({
      data: {
        name: 'team 2',
        active: false,
      },
    })

    const user1 = await db.user.create({
      data: {
        email: chance.email(),
        hashedPassword: USERS_HASHED_PASSWORD,
        salt: USERS_SALT,
      },
    })

    const user2 = await db.user.create({
      data: {
        email: chance.email(),
        hashedPassword: USERS_HASHED_PASSWORD,
        salt: USERS_SALT,
      },
    })

    const role1 = await db.role.create({
      data: {
        name: 'FOO_ROLE',
      },
    })

    const membership1 = await db.membership.create({
      data: {
        teamId: team1.id,
        userId: user1.id,
      },
    })

    await db.membership.create({
      data: {
        teamId: team2.id,
        userId: user2.id,
      },
    })

    await db.membershipRole.create({
      data: {
        membershipId: membership1.id,
        roleId: role1.id,
      },
    })

    await Promise.all(users.map(_upsertUser))
    return null
  } catch (err) {
    console.error(err.message)
    return null
  }
}
