export const schema = gql`
  type MembershipRole {
    id: String!
    membership: Membership!
    membershipId: String!
    role: Role!
    roleId: String!
  }

  type Query {
    membershipRoles: [MembershipRole!]! @requireAuth(roles: ["super admin"])
    membershipRole(id: String!): MembershipRole
      @requireAuth(roles: ["super admin"])
  }

  input CreateMembershipRoleInput {
    membershipId: String!
    roleId: String!
  }

  input UpdateMembershipRoleInput {
    membershipId: String
    roleId: String
  }

  type Mutation {
    createMembershipRole(input: CreateMembershipRoleInput!): MembershipRole!
      @requireAuth(roles: ["super admin"])
    updateMembershipRole(
      id: String!
      input: UpdateMembershipRoleInput!
    ): MembershipRole! @requireAuth(roles: ["super admin"])
    deleteMembershipRole(id: String!): MembershipRole!
      @requireAuth(roles: ["super admin"])
  }
`
