import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const profile: QueryResolvers['profile'] = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const updateProfile: MutationResolvers['updateProfile'] = async ({
  input,
}) =>
  await db.user.update({
    data: input,
    where: { id: context.currentUser.id },
  })
