export const schema = gql`
  type Role {
    id: String!
    name: String!
    membershipRoles: [MembershipRole]!
  }

  type Query {
    roles: [Role!]! @requireAuth
    role(id: String!): Role @requireAuth
  }

  input CreateRoleInput {
    name: String!
  }

  input UpdateRoleInput {
    name: String
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role! @requireAuth
    updateRole(id: String!, input: UpdateRoleInput!): Role! @requireAuth
    deleteRole(id: String!): Role! @requireAuth
  }
`
