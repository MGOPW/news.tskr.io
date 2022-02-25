import {
  feedItemParticipants,
  feedItemParticipant,
  createFeedItemParticipant,
  updateFeedItemParticipant,
  deleteFeedItemParticipant,
} from './feedItemParticipants'

describe('feedItemParticipants', () => {
  scenario('returns all feedItemParticipants', async (scenario) => {
    const result = await feedItemParticipants()

    expect(result.length).toEqual(
      Object.keys(scenario.feedItemParticipant).length
    )
  })

  scenario('returns a single feedItemParticipant', async (scenario) => {
    const result = await feedItemParticipant({
      id: scenario.feedItemParticipant.one.id,
    })

    expect(result).toEqual(scenario.feedItemParticipant.one)
  })

  scenario('creates a feedItemParticipant', async (scenario) => {
    const result = await createFeedItemParticipant({
      input: {
        updatedAt: '2022-02-25T05:56:45Z',
        feedItemId: scenario.feedItemParticipant.two.feedItemId,
        participantId: scenario.feedItemParticipant.two.participantId,
      },
    })

    expect(result.updatedAt).toEqual('2022-02-25T05:56:45Z')
    expect(result.feedItemId).toEqual(
      scenario.feedItemParticipant.two.feedItemId
    )

    expect(result.participantId).toEqual(
      scenario.feedItemParticipant.two.participantId
    )
  })

  scenario('updates a feedItemParticipant', async (scenario) => {
    const original = await feedItemParticipant({
      id: scenario.feedItemParticipant.one.id,
    })

    const result = await updateFeedItemParticipant({
      id: original.id,
      input: { updatedAt: '2022-02-26T05:56:45Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-26T05:56:45Z')
  })

  scenario('deletes a feedItemParticipant', async (scenario) => {
    const original = await deleteFeedItemParticipant({
      id: scenario.feedItemParticipant.one.id,
    })

    const result = await feedItemParticipant({ id: original.id })

    expect(result).toEqual(null)
  })
})
