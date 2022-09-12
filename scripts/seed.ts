//Generate 9 users
//Generate teams

//Generate memberships for each user
//Generate membershiproles for each membership

//Generate roles
//Generate admin user

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
function generateTeam(
  override?: Prisma.UserCreateInput
): Prisma.UserCreateInput {
  return {
    name: pickRandom(['team1', 'team2', 'team3', 'team4']),
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
async function _upsertTeam(team) {
  return db.team.upsert({
    where: {
      id: team.name,
    },
    update: {
      ...team,
    },
    create: {
      ...team,
    },
  })
}

export default async () => {
  try {
    const users = [...Array(9).fill({}).map(generateUser)]
    const data = await Promise.all(users.map(_upsertUser))
    console.log(data)

    const teams = [...Array(5).fill({}).map(generateTeam)]
    const data2 = await Promise.all(teams.map(_upsertTeam))
    console.log(data2)

    const adminUser = {
      admin: true,
      email: ADMIN_EMAIL,
      hashedPassword: ADMIN_HASHED_PASSWORD,
      salt: ADMIN_SALT,
    }

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

    const user1 = await _upsertUser({
      email: chance.email(),
      hashedPassword: USERS_HASHED_PASSWORD,
      salt: USERS_SALT,
    })

    const user2 = await _upsertUser({
      email: chance.email(),
      hashedPassword: USERS_HASHED_PASSWORD,
      salt: USERS_SALT,
    })

    const role1 = await db.role.create({
      data: {
        name: 'Admin',
      },
    })
    // const role2 = await db.role.create({
    //   data: {
    //     name: 'Editor',
    //   },
    // })
    // const role3 = await db.role.create({
    //   data: {
    //     name: 'Viewer',
    //   },
    // })
    const membership1 = await db.membership.upsert({
      where: {
        userTeamConstraint: {
          userId: user1.id,
          teamId: team1.id,
        },
      },
      create: {
        teamId: team1.id,
        userId: user1.id,
      },
      update: {
        teamId: team1.id,
      },
    })

    await db.membership.upsert({
      where: {
        userTeamConstraint: {
          userId: user2.id,
          teamId: team2.id,
        },
      },
      create: {
        teamId: team2.id,
        userId: user2.id,
      },
      update: {
        teamId: team2.id,
      },
    })

    await db.membershipRole.create({
      data: {
        membershipId: membership1.id,
        roleId: role1.id,
      },
    })

    // await Promise.all(users.map(_upsertUser))
    return null
  } catch (err) {
    console.error(err.message)
    return process.exit(1)
  }
}
