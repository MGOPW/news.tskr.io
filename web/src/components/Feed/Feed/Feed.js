import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { DELETE_FEED_MUTATION } from 'src/components/Feed/EditFeedCell'

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

const Feed = ({ feed }) => {
  const [deleteFeed] = useMutation(DELETE_FEED_MUTATION, {
    onCompleted: () => {
      toast.success('Feed deleted')
      navigate(routes.feeds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete feed ' + id + '?')) {
      deleteFeed({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Feed {feed.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{feed.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(feed.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(feed.updatedAt)}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(feed.active)}</td>
            </tr>
            <tr>
              <th>Rss url</th>
              <td>{feed.rssUrl}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{feed.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{feed.description}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{feed.imageUrl}</td>
            </tr>
            <tr>
              <th>Group id</th>
              <td>{feed.groupId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFeed({ id: feed.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(feed.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Feed
