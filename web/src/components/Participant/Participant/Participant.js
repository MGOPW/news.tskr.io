import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_PARTICIPANT_MUTATION } from 'src/components/Participant/EditParticipantCell'

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

const Participant = ({ participant }) => {
  const [deleteParticipant] = useMutation(DELETE_PARTICIPANT_MUTATION, {
    onCompleted: () => {
      toast.success('Participant deleted')
      navigate(routes.participants())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete participant ' + id + '?')) {
      deleteParticipant({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Participant {participant.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{participant.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(participant.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(participant.updatedAt)}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(participant.active)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{participant.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editParticipant({ id: participant.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(participant.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Participant
