export const schema = gql`
  type Profile {
    id: String!
    email: String!
    name: String
    nickname: String
    pronouns: String
  }

  type ProfilePassword {
    existingPassword: String
    newPassword: String
    confirmPassword: String
  }

  type Query {
    profile: Profile @requireAuth
  }

  input UpdateProfileInput {
    email: String
    name: String
    nickname: String
    pronouns: String
  }

  input UpdatePasswordInput {
    existingPassword: String!
    newPassword: String!
    confirmPassword: String!
  }

  type Mutation {
    updateProfile(input: UpdateProfileInput!): Profile! @requireAuth
    updatePassword(input: UpdatePasswordInput!): ProfilePassword! @requireAuth
  }
`
