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
    membership: Membership
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
  }

  input UpdateUserInput {
    email: String
    name: String
    nickname: String
    pronouns: String
    active: Boolean
    admin: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
      @requireAuth(roles: ["super admin"])
    updateUser(id: String!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["super admin"])
    deleteUser(id: String!): User! @requireAuth(roles: ["super admin"])
  }
`