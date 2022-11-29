// import { EmailChangeVerification } from 'src/components/Profile/EmailChangeVerification'
import { Verification } from 'src/components/Verification'

const EmailChangeVerificationPage = ({ verifyToken }) => (
  // <EmailChangeVerification token={verifyToken} />
  <Verification token={verifyToken} />
)

export default EmailChangeVerificationPage
