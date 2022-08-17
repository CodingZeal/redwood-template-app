export const schema = gql`
  type Team {
    id: String!
    name: String!
    active: Boolean!
    updatedAt: DateTime!
    createdAt: DateTime!
    memberships: [Membership]!
  }

  type Query {
    teams: [Team!]! @requireAuth(roles: ["super admin"])
    team(id: String!): Team @requireAuth(roles: ["super admin"])
  }

  input CreateTeamInput {
    name: String!
    active: Boolean!
  }

  input UpdateTeamInput {
    name: String
    active: Boolean
  }

  type Mutation {
    createTeam(input: CreateTeamInput!): Team!
      @requireAuth(roles: ["super admin"])
    updateTeam(id: String!, input: UpdateTeamInput!): Team!
      @requireAuth(roles: ["super admin"])
    deleteTeam(id: String!): Team! @requireAuth(roles: ["super admin"])
  }
`
