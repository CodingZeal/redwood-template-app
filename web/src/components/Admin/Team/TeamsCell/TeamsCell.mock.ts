export const standard = () => ({
  teams: [
    {
      id: '365',
      name: 'team1',
      active: true,
      updatedAt: '',
      createdAt: '',
      memberships: [
        {
          id: 'monkey1',
          user: {
            id: '42',
            email: 'foo@bar.com',
            name: 'Foo Bar',
            nickname: 'Bar',
          },
        },
      ],
    },
    {
      id: '10',
      name: 'team2',
      active: true,
      updatedAt: '',
      createdAt: '',
      memberships: [
        {
          id: 'monkey1',
          user: {
            id: '42',
            email: 'foo@bar.com',
            name: 'Foo Bar',
            nickname: 'Bar',
          },
        },
      ],
    },
  ],
})
