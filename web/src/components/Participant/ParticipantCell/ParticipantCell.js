import Participant from 'src/components/Participant/Participant'

export const QUERY = gql`
  query FindParticipantById($id: Int!) {
    participant: participant(id: $id) {
      id
      createdAt
      updatedAt
      active
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Participant not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ participant }) => {
  return <Participant participant={participant} />
}
