export const schema = gql`
  type Profile {
    id: String!
    email: String!
    name: String
    nickname: String
    pronouns: String
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

  type Mutation {
    updateProfile(input: UpdateProfileInput!): Profile! @requireAuth
  }
`
