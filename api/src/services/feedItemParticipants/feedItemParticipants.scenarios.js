export const standard = defineScenario({
  feedItemParticipant: {
    one: {
      data: {
        updatedAt: '2022-02-25T05:56:45Z',
        feedItem: {
          create: {
            updatedAt: '2022-02-25T05:56:45Z',
            url: 'String2146607',
            feed: {
              create: {
                updatedAt: '2022-02-25T05:56:45Z',
                title: 'String',
                description: 'String',
                group: {
                  create: {
                    updatedAt: '2022-02-25T05:56:45Z',
                    name: 'String323072',
                    description: 'String',
                  },
                },
              },
            },
          },
        },

        participant: { create: { updatedAt: '2022-02-25T05:56:45Z' } },
      },
    },

    two: {
      data: {
        updatedAt: '2022-02-25T05:56:45Z',
        feedItem: {
          create: {
            updatedAt: '2022-02-25T05:56:45Z',
            url: 'String372187',
            feed: {
              create: {
                updatedAt: '2022-02-25T05:56:45Z',
                title: 'String',
                description: 'String',
                group: {
                  create: {
                    updatedAt: '2022-02-25T05:56:45Z',
                    name: 'String1123961',
                    description: 'String',
                  },
                },
              },
            },
          },
        },

        participant: { create: { updatedAt: '2022-02-25T05:56:45Z' } },
      },
    },
  },
})
