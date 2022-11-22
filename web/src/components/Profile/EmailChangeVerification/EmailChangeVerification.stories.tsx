import type { ComponentMeta } from '@storybook/react'

import { EmailChangeVerification } from './EmailChangeVerification'

export const generated = () => {
  return <EmailChangeVerification token="abc" />
}

export default {
  title: 'Components/EmailChangeVerification',
  component: EmailChangeVerification,
} as ComponentMeta<typeof EmailChangeVerification>
