import type {
  QueryResolvers,
  MutationResolvers,
  TeamResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const teams: QueryResolvers['teams'] = () => {
  return db.team.findMany()
}

export const team: QueryResolvers['team'] = ({ id }) => {
  return db.team.findUnique({
    where: { id },
  })
}

export const createTeam: MutationResolvers['createTeam'] = ({ input }) => {
  return db.team.create({
    data: input,
  })
}

export const updateTeam: MutationResolvers['updateTeam'] = ({ id, input }) => {
  return db.team.update({
    data: input,
    where: { id },
  })
}

export const deleteTeam: MutationResolvers['deleteTeam'] = async ({ id }) => {
  const membership = await db.membership.findMany({
    where: { teamId: id },
  })
  if (membership.length > 0) {
    throw new Error('Team is in use, please remove users before deletion')
  }

  return db.team.delete({
    where: { id },
  })
}

export const Team: TeamResolvers = {
  memberships: (_obj, { root }) =>
    db.team.findUnique({ where: { id: root.id } }).memberships(),
}
