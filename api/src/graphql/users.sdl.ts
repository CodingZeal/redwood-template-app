export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    nickname: String
    pronouns: String
    active: Boolean!
    admin: Boolean!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    updatedAt: DateTime!
    createdAt: DateTime!
    membership: Membership
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    nickname: String
    pronouns: String
    active: Boolean!
    admin: Boolean!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
    nickname: String
    pronouns: String
    active: Boolean
    admin: Boolean
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
