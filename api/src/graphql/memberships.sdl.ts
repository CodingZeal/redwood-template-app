export const schema = gql`
  type Membership {
    id: String!
    user: User!
    userId: String!
    team: Team!
    teamId: String!
    membershipRoles: [MembershipRole]!
  }

  type Query {
    memberships: [Membership!]! @requireAuth(roles: ["super admin"])
    membership(id: String!): Membership @requireAuth(roles: ["super admin"])
  }

  input CreateMembershipInput {
    userId: String!
    teamId: String!
  }

  input UpdateMembershipInput {
    userId: String
    teamId: String
  }

  type Mutation {
    createMembership(input: CreateMembershipInput!): Membership!
      @requireAuth(roles: ["super admin"])
    updateMembership(id: String!, input: UpdateMembershipInput!): Membership!
      @requireAuth(roles: ["super admin"])
    deleteMembership(id: String!): Membership!
      @requireAuth(roles: ["super admin"])
  }
`
