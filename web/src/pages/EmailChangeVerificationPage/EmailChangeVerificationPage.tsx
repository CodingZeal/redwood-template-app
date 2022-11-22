import { EmailChangeVerification } from 'src/components/Profile/EmailChangeVerification'

const EmailChangeVerificationPage = ({ verifyToken }) => (
  <EmailChangeVerification token={verifyToken} />
)

export default EmailChangeVerificationPage
