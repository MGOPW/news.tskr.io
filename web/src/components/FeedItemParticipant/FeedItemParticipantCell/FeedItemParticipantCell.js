import FeedItemParticipant from 'src/components/FeedItemParticipant/FeedItemParticipant'

export const QUERY = gql`
  query FindFeedItemParticipantById($id: Int!) {
    feedItemParticipant: feedItemParticipant(id: $id) {
      id
      createdAt
      updatedAt
      feedItemId
      participantId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>FeedItemParticipant not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ feedItemParticipant }) => {
  return <FeedItemParticipant feedItemParticipant={feedItemParticipant} />
}
