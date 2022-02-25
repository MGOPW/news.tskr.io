import FeedItem from 'src/components/FeedItem/FeedItem'

export const QUERY = gql`
  query FindFeedItemById($id: Int!) {
    feedItem: feedItem(id: $id) {
      id
      createdAt
      updatedAt
      title
      url
      active
      feedId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>FeedItem not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ feedItem }) => {
  return <FeedItem feedItem={feedItem} />
}
