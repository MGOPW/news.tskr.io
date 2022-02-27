import { Box } from '@chakra-ui/react'
import NavItem from '../NavItem/NavItem'
import { Icon } from '@chakra-ui/react'
import { MdTextSnippet, MdAudiotrack, MdVideoLibrary } from 'react-icons/md'
export const QUERY = gql`
  query searchPublicFeeds(
    $filter: String
    $skip: Int
    $take: Int
    $q: String
    $orderBy: OrderByInput
  ) {
    feeds: searchPublicFeeds(
      filter: $filter
      skip: $skip
      take: $take
      q: $q
      orderBy: $orderBy
    ) {
      count
      take
      skip
      q
      results {
        id
        title
        feedIcon
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ feeds }) => {
  //Prisma doesnt do case-insensitve sorting
  //https://github.com/prisma/prisma/issues/5068
  let sorted = [...feeds.results]
  sorted.sort((a, b) => {
    try {
      if (a.title.toUpperCase() < b.title.toUpperCase()) return -1
      if (a.title.toUpperCase() > b.title.toUpperCase()) return 1

      return 0
    } catch (e) {
      console.log('error', e)
    }
  })
  return (
    <Box>
      <NavItem navigateTo={'home'}>All</NavItem>

      <Box overflow={'scroll'} height={'100vh'}>
        <ul>
          {sorted.map((feed) => {
            return (
              <NavItem
                pt={0}
                pb={0}
                size={'sm'}
                key={feed.id}
                navigateTo={'home'}
                query={{ q: `{"feedId":${feed.id}}` }}
              >
                {feed?.feedIcon === 'Text' && <Icon as={MdTextSnippet} />}
                {feed?.feedIcon === 'Audio' && <Icon as={MdAudiotrack} />}
                {feed?.feedIcon === 'Video' && <Icon as={MdVideoLibrary} />}
                {feed.title}
              </NavItem>
            )
          })}
        </ul>
      </Box>
    </Box>
  )
}
