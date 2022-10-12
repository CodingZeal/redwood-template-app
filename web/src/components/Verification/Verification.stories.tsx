import type { ComponentMeta } from '@storybook/react'

import { Verification } from './Verification'

export const generated = () => {
  return <Verification token="abc" />
}

export default {
  title: 'Components/Verification',
  component: Verification,
} as ComponentMeta<typeof Verification>
