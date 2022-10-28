import type { ComponentMeta } from '@storybook/react'

import { ResetPassword } from './ResetPassword'

export const generated = () => {
  return (
    <ResetPassword
      resetToken={undefined}
      title={undefined}
      message={undefined}
    />
  )
}

export default {
  title: 'Components/ResetPassword',
  component: ResetPassword,
} as ComponentMeta<typeof ResetPassword>
