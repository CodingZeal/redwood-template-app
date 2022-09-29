export const standard = () => ({
  users: [
    {
      id: '42',
      name: 'Harry',
      email: 'harry.potter@wizard.com',
      nickname: 'Scar',
      active: true,
      admin: true,
      pronouns: 'he',
      updatedAt: '',
      createdAt: '',
      Memberships: {
        Team: {
          name: 'team1',
        },
      },
    },
    {
      id: '7',
      name: 'Ron',
      email: 'ron@wizard.com',
      nickname: 'Red',
      active: false,
      admin: true,
      pronouns: 'he',
      updatedAt: '',
      createdAt: '',
      Memberships: {
        Team: {
          name: 'team2',
        },
      },
    },
  ],
})
