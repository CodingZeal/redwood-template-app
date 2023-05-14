import { Avatar, IAvatar } from './Avatar'

const Template = (args: IAvatar) => <Avatar {...args} />

export const Primary = Template.bind({})
Primary.args = {
  user: {
    email: 'foobar@example.com',
    name: 'Foo Bar',
    nickname: 'Bar',
  },
}

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    className: {
      name: 'className',
      type: { name: 'string', required: false },
      description: 'CSS classes',
      defaultValue: 'null',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'null' },
      },
    },
    height: {
      name: 'height',
      type: { name: 'number', required: false },
      description: 'avatar height in pixels',
      defaultValue: 44,
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 44 },
      },
    },
    width: {
      name: 'width',
      type: { name: 'number', required: false },
      description: 'avatar width in pixels',
      defaultValue: 44,
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 44 },
      },
    },
  },
}
