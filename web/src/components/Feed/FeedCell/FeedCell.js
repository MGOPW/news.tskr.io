import Feed from 'src/components/Feed/Feed'

export const QUERY = gql`
  query FindFeedById($id: Int!) {
    feed: feed(id: $id) {
      id
      createdAt
      updatedAt
      active
      rssUrl
      title
      description
      imageUrl
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Feed not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ feed }) => {
  return <Feed feed={feed} />
}
