import { feeds, feed, createFeed, updateFeed, deleteFeed } from './feeds'

describe('feeds', () => {
  scenario('returns all feeds', async (scenario) => {
    const result = await feeds()

    expect(result.length).toEqual(Object.keys(scenario.feed).length)
  })

  scenario('returns a single feed', async (scenario) => {
    const result = await feed({ id: scenario.feed.one.id })

    expect(result).toEqual(scenario.feed.one)
  })

  scenario('creates a feed', async (scenario) => {
    const result = await createFeed({
      input: {
        updatedAt: '2022-02-25T04:45:26Z',
        title: 'String',
        description: 'String',
        groupId: scenario.feed.two.groupId,
      },
    })

    expect(result.updatedAt).toEqual('2022-02-25T04:45:26Z')
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.groupId).toEqual(scenario.feed.two.groupId)
  })

  scenario('updates a feed', async (scenario) => {
    const original = await feed({ id: scenario.feed.one.id })
    const result = await updateFeed({
      id: original.id,
      input: { updatedAt: '2022-02-26T04:45:26Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-26T04:45:26Z')
  })

  scenario('deletes a feed', async (scenario) => {
    const original = await deleteFeed({ id: scenario.feed.one.id })
    const result = await feed({ id: original.id })

    expect(result).toEqual(null)
  })
})
