// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ResetPassword> = (args) => {
//   return <ResetPassword {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

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
