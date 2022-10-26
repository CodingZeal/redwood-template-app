import { ResetPassword } from 'src/components/ResetPassword'

const CreatePasswordPage = ({ resetToken }) => (
  <ResetPassword
    resetToken={resetToken}
    title="Welcome"
    message="Set your password"
  />
)

export default CreatePasswordPage
