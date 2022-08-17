import type {
  QueryResolvers,
  MutationResolvers,
  MembershipRoleResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const membershipRoles: QueryResolvers['membershipRoles'] = () => {
  return db.membershipRole.findMany()
}

export const membershipRole: QueryResolvers['membershipRole'] = ({ id }) => {
  return db.membershipRole.findUnique({
    where: { id },
  })
}

export const createMembershipRole: MutationResolvers['createMembershipRole'] =
  ({ input }) => {
    return db.membershipRole.create({
      data: input,
    })
  }

export const updateMembershipRole: MutationResolvers['updateMembershipRole'] =
  ({ id, input }) => {
    return db.membershipRole.update({
      data: input,
      where: { id },
    })
  }

export const deleteMembershipRole: MutationResolvers['deleteMembershipRole'] =
  ({ id }) => {
    return db.membershipRole.delete({
      where: { id },
    })
  }

export const MembershipRole: MembershipRoleResolvers = {
  membership: (_obj, { root }) =>
    db.membershipRole.findUnique({ where: { id: root.id } }).membership(),
  role: (_obj, { root }) =>
    db.membershipRole.findUnique({ where: { id: root.id } }).role(),
}
