import { ResetPassword } from 'src/components/ResetPassword'

const ResetPasswordPage = ({ resetToken }) => (
  <ResetPassword
    resetToken={resetToken}
    title="Reset Password"
    message="New Password"
  />
)

export default ResetPasswordPage
