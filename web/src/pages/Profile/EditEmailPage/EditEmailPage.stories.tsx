import type { ComponentMeta } from '@storybook/react'

import EditEmailPage from './EditEmailPage'

export const generated = () => {
  return <EditEmailPage />
}

export default {
  title: 'Pages/EditEmailPage',
  component: EditEmailPage,
} as ComponentMeta<typeof EditEmailPage>
