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
`
