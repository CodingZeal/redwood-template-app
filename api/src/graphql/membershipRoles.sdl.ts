export const schema = gql`
  type MembershipRole {
    id: String!
    membership: Membership!
    membershipId: String!
    role: Role!
    roleId: String!
  }

  type Query {
    membershipRoles: [MembershipRole!]! @requireAuth
    membershipRole(id: String!): MembershipRole @requireAuth
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
      @requireAuth
    updateMembershipRole(
      id: String!
      input: UpdateMembershipRoleInput!
    ): MembershipRole! @requireAuth
    deleteMembershipRole(id: String!): MembershipRole! @requireAuth
  }
`
