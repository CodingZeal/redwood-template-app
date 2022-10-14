import type { ComponentMeta } from '@storybook/react'

import VerificationResetPage from './VerificationResetPage'

export const generated = () => {
  return <VerificationResetPage />
}

export default {
  title: 'Pages/VerificationResetPage',
  component: VerificationResetPage,
} as ComponentMeta<typeof VerificationResetPage>
