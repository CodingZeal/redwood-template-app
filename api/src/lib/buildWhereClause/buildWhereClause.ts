import { isEmpty, isNil, reject } from 'ramda'
import { QueryuserArgs } from 'types/graphql'

const removeUndefined = reject(isNil)

export const buildWhereClause = (where?): { where: QueryuserArgs } => {
  if (isNil(where)) return

  const filteredWhere = removeUndefined(where)

  if (isEmpty(filteredWhere)) return

  return { where }
}
