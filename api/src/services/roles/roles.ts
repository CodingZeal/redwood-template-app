import type {
  QueryResolvers,
  MutationResolvers,
  RoleResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const roles: QueryResolvers['roles'] = () => {
  return db.role.findMany()
}

export const role: QueryResolvers['role'] = ({ id }) => {
  return db.role.findUnique({
    where: { id },
  })
}

export const createRole: MutationResolvers['createRole'] = ({ input }) => {
  return db.role.create({
    data: input,
  })
}

export const updateRole: MutationResolvers['updateRole'] = ({ id, input }) => {
  return db.role.update({
    data: input,
    where: { id },
  })
}

export const deleteRole: MutationResolvers['deleteRole'] = ({ id }) => {
  return db.role.delete({
    where: { id },
  })
}

export const Role: RoleResolvers = {
  membershipRoles: (_obj, { root }) =>
    db.role.findUnique({ where: { id: root.id } }).membershipRoles(),
}
