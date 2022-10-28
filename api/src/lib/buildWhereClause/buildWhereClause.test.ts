import { buildWhereClause } from './buildWhereClause'

describe('lib/buildWhereClause', () => {
  describe('when no aruguments are present', () => {
    it('returns undefined', () => {
      expect(buildWhereClause()).toBeUndefined()
      expect(buildWhereClause({})).toBeUndefined()
    })
  })

  describe('when some arguments are undefined', () => {
    it('returns undefined', () => {
      expect(buildWhereClause({ active: undefined })).toBeUndefined()
    })
  })

  describe('when arguments are present with values', () => {
    it('returns the where clause', () => {
      expect(buildWhereClause({ active: true })).toEqual({
        where: { active: true },
      })
    })
  })

  describe('when some arguments have values and some are undefined', () => {
    it('returns the where clause with only the arguments that have values', () => {
      expect(buildWhereClause({ active: true, name: undefined })).toEqual({
        where: { active: true },
      })
    })
  })
})
