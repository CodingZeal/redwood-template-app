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
`
