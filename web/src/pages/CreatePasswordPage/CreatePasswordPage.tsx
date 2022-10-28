import { ResetPassword } from 'src/components/ResetPassword'

const CreatePasswordPage = ({ token }) => (
  <ResetPassword
    resetToken={token}
    title="Welcome"
    message="Set your password"
  />
)

export default CreatePasswordPage
