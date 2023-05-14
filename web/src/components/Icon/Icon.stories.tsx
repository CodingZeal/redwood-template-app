import { Icon, IIcon } from './Icon'

const Template = (args: IIcon) => <Icon {...args} />

export const Addition = Template.bind({})
Addition.args = {
  name: 'Addition',
}

export const Archive = Template.bind({})
Archive.args = {
  name: 'Archive',
}

export const Arrow = Template.bind({})
Arrow.args = {
  name: 'Arrow',
}

export const Check = Template.bind({})
Check.args = {
  name: 'Check',
}

export const Email = Template.bind({})
Email.args = {
  name: 'Email',
}

export const Eye = Template.bind({})
Eye.args = {
  name: 'Eye',
}

export const Github = Template.bind({})
Github.args = {
  name: 'Github',
}

export const Lock = Template.bind({})
Lock.args = {
  name: 'Lock',
}

export const Logout = Template.bind({})
Logout.args = {
  name: 'Logout',
}

export const NavMenu = Template.bind({})
NavMenu.args = {
  name: 'NavMenu',
}

export const Pen = Template.bind({})
Pen.args = {
  name: 'Pen',
}

export const Profile = Template.bind({})
Profile.args = {
  name: 'Profile',
}

export const Security = Template.bind({})
Security.args = {
  name: 'Security',
}

export const Twitter = Template.bind({})
Twitter.args = {
  name: 'Twitter',
}

const iconOptions = ['unmute']

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      name: 'name',
      description: 'name of the icon',
      control: {
        type: 'select',
        options: iconOptions,
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'null' },
      },
    },
    className: {
      name: 'className',
      type: { name: 'string', required: true },
      defaultValue: '',
      description: 'CSS class names',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string', defaultValue: { summary: '' } },
      },
    },
    height: {
      name: 'height',
      type: { name: 'number', required: false },
      description: 'avatar height in pixels',
      defaultValue: 24,
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 24 },
      },
    },
    width: {
      name: 'width',
      type: { name: 'number', required: false },
      description: 'avatar width in pixels',
      defaultValue: 24,
      control: {
        type: 'number',
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 24 },
      },
    },
  },
}
