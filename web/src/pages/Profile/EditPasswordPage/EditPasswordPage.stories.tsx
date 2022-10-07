import type { ComponentMeta } from '@storybook/react'

import EditPasswordPage from './EditPasswordPage'

export const generated = () => {
  return <EditPasswordPage />
}

export default {
  title: 'Pages/EditPasswordPage',
  component: EditPasswordPage,
} as ComponentMeta<typeof EditPasswordPage>
