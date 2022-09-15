export const QUERY = gql`
  mutation VerificationMutation($token: String!) {
    verifyUser: verifyUser(token: $token)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ verifyUser }) => {
  return <div>{JSON.stringify(verifyUser)}</div>
}
