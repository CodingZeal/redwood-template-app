export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    nickname: String
    pronouns: String
    active: Boolean!
    admin: Boolean!
    updatedAt: DateTime!
    createdAt: DateTime!
    memberships: [Membership]
    verified: Boolean!
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["super admin"])
    user(id: String!): User @requireAuth(roles: ["super admin"])
  }

  input CreateUserInput {
    email: String!
    name: String
    nickname: String
    pronouns: String
    active: Boolean!
    admin: Boolean!
    teamIds: [String]
    roleIds: [String]
    verified: Boolean!
  }

  input UpdateUserInput {
    email: String
    name: String
    nickname: String
    pronouns: String
    active: Boolean
    admin: Boolean
    teamIds: [String]
    roleIds: [String]
    verified: Boolean!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
      @requireAuth(roles: ["super admin"])
    updateUser(id: String!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["super admin"])
    removeUser(id: String!): User! @requireAuth(roles: ["super admin"])
    verifyUser(token: String!): Boolean! @requireAuth(roles: [])
    verifyReset(email: String!): String! @skipAuth()
  }
`
