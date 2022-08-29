export const schema = gql`
  type Role {
    id: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    membershipRoles: [MembershipRole]!
  }

  type Query {
    roles: [Role!]! @requireAuth(roles: ["super admin"])
    role(id: String!): Role @requireAuth(roles: ["super admin"])
  }

  input CreateRoleInput {
    name: String!
  }

  input UpdateRoleInput {
    name: String
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role!
      @requireAuth(roles: ["super admin"])
    updateRole(id: String!, input: UpdateRoleInput!): Role!
      @requireAuth(roles: ["super admin"])
    deleteRole(id: String!): Role! @requireAuth(roles: ["super admin"])
  }
`
