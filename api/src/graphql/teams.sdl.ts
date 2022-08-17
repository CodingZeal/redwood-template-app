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
    teams: [Team!]! @requireAuth
    team(id: String!): Team @requireAuth
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
    createTeam(input: CreateTeamInput!): Team! @requireAuth
    updateTeam(id: String!, input: UpdateTeamInput!): Team! @requireAuth
    deleteTeam(id: String!): Team! @requireAuth
  }
`
