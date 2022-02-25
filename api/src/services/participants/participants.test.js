import {
  participants,
  participant,
  createParticipant,
  updateParticipant,
  deleteParticipant,
} from './participants'

describe('participants', () => {
  scenario('returns all participants', async (scenario) => {
    const result = await participants()

    expect(result.length).toEqual(Object.keys(scenario.participant).length)
  })

  scenario('returns a single participant', async (scenario) => {
    const result = await participant({ id: scenario.participant.one.id })

    expect(result).toEqual(scenario.participant.one)
  })

  scenario('creates a participant', async () => {
    const result = await createParticipant({
      input: { updatedAt: '2022-02-25T05:54:42Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-25T05:54:42Z')
  })

  scenario('updates a participant', async (scenario) => {
    const original = await participant({ id: scenario.participant.one.id })
    const result = await updateParticipant({
      id: original.id,
      input: { updatedAt: '2022-02-26T05:54:42Z' },
    })

    expect(result.updatedAt).toEqual('2022-02-26T05:54:42Z')
  })

  scenario('deletes a participant', async (scenario) => {
    const original = await deleteParticipant({
      id: scenario.participant.one.id,
    })

    const result = await participant({ id: original.id })

    expect(result).toEqual(null)
  })
})
