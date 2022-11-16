import { db } from '../../../api/src/lib/db'
import { hashPassword } from '../../../scripts/seed'

export interface IUser {
  email: string
  hashedPassword?: string
  salt?: string
  role?: string
  resetToken?: string
  resetTokenExpiresAt?: Date
  verifyToken?: string
}

export class MockUserEntity {
  static removeById(id: string) {
    return db.user.deleteMany({
      where: {
        id,
      },
    })
  }
  static removeByEmail(email: string) {
    return db.user.delete({
      where: {
        email,
      },
    })
  }
  static findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
      },
    })
  }
  static upsert(data: IUser) {
    const [hashedPassword, salt] = hashPassword('password')
    return db.user.upsert({
      where: {
        email: data.email,
      },
      update: {
        ...data,
      },
      create: {
        ...data,
        hashedPassword,
        salt,
      },
    })
  }
}
