import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_FEED_ITEM_PARTICIPANT_MUTATION } from 'src/components/FeedItemParticipant/EditFeedItemParticipantCell'

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const FeedItemParticipant = ({ feedItemParticipant }) => {
  const [deleteFeedItemParticipant] = useMutation(
    DELETE_FEED_ITEM_PARTICIPANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('FeedItemParticipant deleted')
        navigate(routes.feedItemParticipants())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete feedItemParticipant ' + id + '?')
    ) {
      deleteFeedItemParticipant({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FeedItemParticipant {feedItemParticipant.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{feedItemParticipant.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(feedItemParticipant.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(feedItemParticipant.updatedAt)}</td>
            </tr>
            <tr>
              <th>Feed item id</th>
              <td>{feedItemParticipant.feedItemId}</td>
            </tr>
            <tr>
              <th>Participant id</th>
              <td>{feedItemParticipant.participantId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFeedItemParticipant({ id: feedItemParticipant.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(feedItemParticipant.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default FeedItemParticipant
