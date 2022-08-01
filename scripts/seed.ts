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

function generateUser(override?: Record<string, unknown>) {
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
    await Promise.all(users.map(_upsertUser))
    return null
  } catch (err) {
    console.error(err.message)
    return null
  }
}
