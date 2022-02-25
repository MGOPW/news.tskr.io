import {
  feedItems,
  feedItem,
  createFeedItem,
  updateFeedItem,
  deleteFeedItem,
} from './feedItems'

describe('feedItems', () => {
  scenario('returns all feedItems', async (scenario) => {
    const result = await feedItems()

    expect(result.length).toEqual(Object.keys(scenario.feedItem).length)
  })

  scenario('returns a single feedItem', async (scenario) => {
    const result = await feedItem({ id: scenario.feedItem.one.id })

    expect(result).toEqual(scenario.feedItem.one)
  })

  scenario('creates a feedItem', async (scenario) => {
    const result = await createFeedItem({
      input: {
        updatedAt: '2022-02-25T05:32:44Z',
        url: 'String2886497',
        feedId: scenario.feedItem.two.feedId,
      },
    })

    expect(result.updatedAt).toEqual('2022-02-25T05:32:44Z')
    expect(result.url).toEqual('String2886497')
    expect(result.feedId).toEqual(scenario.feedItem.two.feedId)
  })

  scenario('updates a feedItem', async (scenario) => {
    const original = await feedItem({ id: scenario.feedItem.one.id })
    const result = await updateFeedItem({
      id: original.id,
      input: { updatedAt: '2022-02-26T05:32:44Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-26T05:32:44Z')
  })

  scenario('deletes a feedItem', async (scenario) => {
    const original = await deleteFeedItem({ id: scenario.feedItem.one.id })
    const result = await feedItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
