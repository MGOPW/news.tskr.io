import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_FEED_ITEM_MUTATION } from 'src/components/FeedItem/EditFeedItemCell'

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

const FeedItem = ({ feedItem }) => {
  const [deleteFeedItem] = useMutation(DELETE_FEED_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('FeedItem deleted')
      navigate(routes.feedItems())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete feedItem ' + id + '?')) {
      deleteFeedItem({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            FeedItem {feedItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{feedItem.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(feedItem.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(feedItem.updatedAt)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{feedItem.title}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{feedItem.url}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(feedItem.active)}</td>
            </tr>
            <tr>
              <th>Feed id</th>
              <td>{feedItem.feedId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFeedItem({ id: feedItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(feedItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default FeedItem
