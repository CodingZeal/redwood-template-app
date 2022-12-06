import { db } from 'src/lib/db'

import {
  profile,
  updateProfile,
  updatePassword,
  updateEmail,
  verifyEmail,
} from './profile'
import { StandardScenario, defaultProfilePassword } from './profile.scenarios'

describe('profile', () => {
  scenario('returns user profile', async (scenario: StandardScenario) => {
    mockCurrentUser(defaultCurrentUser(scenario.user.profile))
    const result = await profile({ id: scenario.user.profile.id })

    expect(result).toEqual(scenario.user.profile)
  })

  scenario('updates user profile', async (scenario: StandardScenario) => {
    mockCurrentUser(defaultCurrentUser(scenario.user.profile))
    const before = new Date()
    const result = await updateProfile({
      input: { email: 'String61961682' },
    })

    expect(result.email).toEqual('String61961682')

    const user = await db.user.findUnique({
      where: { id: scenario.user.profile.id },
    })

    expect(user.email).toEqual('String61961682')
    expect(user.createdAt.getTime()).toBeLessThanOrEqual(before.getTime())
    expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
  })

  scenario('updates profile password', async (scenario: StandardScenario) => {
    mockCurrentUser(defaultCurrentUser(scenario.user.profile))

    const newPassword = `${defaultProfilePassword}-UPDATE`
    await expect(
      updatePassword({
        input: {
          existingPassword: defaultProfilePassword,
          newPassword,
          confirmPassword: newPassword,
        },
      })
    ).resolves.toEqual(true)
  })

  scenario(
    'password update fails when confirmation password does not match new',
    async (scenario: StandardScenario) => {
      mockCurrentUser(defaultCurrentUser(scenario.user.profile))

      expect(
        updatePassword({
          input: {
            existingPassword: defaultProfilePassword,
            newPassword: 'NEW',
            confirmPassword: 'not matching',
          },
        })
      ).rejects.toThrowError('does not match the confirmation password')
    }
  )

  scenario(
    'password update fails when existing password is invalid',
    async (scenario: StandardScenario) => {
      mockCurrentUser(defaultCurrentUser(scenario.user.profile))

      expect(
        updatePassword({
          input: {
            existingPassword: 'INVALID',
            newPassword: 'NEW',
            confirmPassword: 'NEW',
          },
        })
      ).rejects.toThrowError('password is not correct')
    }
  )

  scenario(
    'password update fails when missing arguments',
    async (scenario: StandardScenario) => {
      mockCurrentUser(defaultCurrentUser(scenario.user.profile))
      const input = {
        existingPassword: 'x',
        newPassword: 'y',
        confirmPassword: 'y',
      }

      expect(
        updatePassword({ input: { ...input, existingPassword: '' } })
      ).rejects.toThrowError('must be present')

      expect(
        updatePassword({ input: { ...input, newPassword: '' } })
      ).rejects.toThrowError('must be present')

      expect(
        updatePassword({ input: { ...input, confirmPassword: '' } })
      ).rejects.toThrowError('must be present')
    }
  )

  describe('update profile email', () => {
    scenario('updates email', async (scenario: StandardScenario) => {
      mockCurrentUser(defaultCurrentUser(scenario.user.profile))
      expect(
        updateEmail({
          input: {
            password: defaultProfilePassword,
            newEmail: 'foobar@example.com',
          },
        })
      ).resolves.toEqual(true)
    })

    scenario(
      'email update fails when password is invalid',
      async (scenario: StandardScenario) => {
        mockCurrentUser(defaultCurrentUser(scenario.user.profile))

        expect(
          updateEmail({
            input: {
              password: 'INVALID',
              newEmail: 'NEW',
            },
          })
        ).rejects.toThrowError('password is not correct')
      }
    )
    scenario(
      'email update fails when missing arguments',
      async (scenario: StandardScenario) => {
        mockCurrentUser(defaultCurrentUser(scenario.user.profile))

        const input = {
          password: defaultProfilePassword,
          newEmail: 'foobar@example.com',
        }

        expect(
          updateEmail({ input: { ...input, password: '' } })
        ).rejects.toThrowError('must be present')

        expect(
          updateEmail({ input: { ...input, newEmail: '' } })
        ).rejects.toThrowError('must be present')
      }
    )
  })

  describe('verify user', () => {
    scenario('with verify token', async (scenario: StandardScenario) => {
      const result = await verifyEmail({
        token: scenario.user.profile.verifyToken,
      })
      const user = await db.user.findUnique({
        where: { id: scenario.user.profile.id },
      })

      expect(result).toEqual(true)
      expect(user.verifyToken).toEqual(null)
    })

    scenario(
      'with invalid verify token',
      async (scenario: StandardScenario) => {
        const result = await verifyEmail({ token: 'invalid' })
        const user = await db.user.findUnique({
          where: { id: scenario.user.profile.id },
        })

        expect(result).toEqual(false)
        expect(user.verifyToken).toEqual(scenario.user.profile.verifyToken)
      }
    )
  })
})

const defaultCurrentUser = (profile) => {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    nickname: profile.nickname,
    pronouns: profile.pronouns,
  }
}
