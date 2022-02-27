import { navigate, routes, useLocation } from '@redwoodjs/router'
import { useState, useEffect } from 'react'
import {
  Flex,
  Table,
  TableCaption,
  Heading,
  Box,
  Spacer,
  Button,
  useMediaQuery,
  Center,
} from '@chakra-ui/react'
import TableColumns from 'src/components/TableColumns'
import TableQuery from 'src/components/TableQuery'
import TablePagination from 'src/components/TablePagination'
import TableRows from 'src/components/TableRows/TableRows'
import { DELETE_FEED_ITEM_MUTATION } from 'src/components/FeedItem/EditFeedItemCell'
import { MdAdd, MdKeyboardBackspace } from 'react-icons/md'
import TableSkeleton from 'src/components/TableSkeleton/TableSkeleton'

export const beforeQuery = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  let variables = {
    q: params.get('q'),
    filter: params.get('filter') || props.fuzzyQuery,
    skip: params.get('skip') || props.skip || 0,
    take: params.get('take') || props.take || 10,
    orderBy: params.get('orderBy') || props.orderBy,
  }
  //console.log(variables)
  return {
    variables,
    fetchPolicy: 'no-cache',
  }
}
// Looks like you have some foreign keys
// ["feedId"] you may want to update the query
// below to include the related values
export const QUERY = gql`
  query searchPublicItems(
    $filter: String
    $skip: Int
    $take: Int
    $q: String
    $orderBy: OrderByInput
  ) {
    feedItems: searchPublicItems(
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
        url
        createdAt
        feedId
        _feedTitle
        _feedId
        _participants {
          name
        }
      }
    }
  }
`

export const Loading = () => <TableSkeleton />

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.feedItem}</div>
)

export const Success = ({
  feedItems,
  fuzzyQuery,
  setFuzzyQuery,
  query,
  setQuery,
  columns,
  initialColumns,
  setColumns,
  orderBy,
  setOrderBy,
  skip,
  setSkip,
  take,
  setTake,
  displayColumn,
  roles,
}) => {
  let [data, setData] = useState(feedItems)
  const [isSmallScreen] = useMediaQuery(`(max-width: 950px)`)
  // if small screen remove inner array from columns and data.
  let returnFirstAndLast = (arrayOfThings) => {
    let { 0: a, [arrayOfThings.length - 1]: b } = arrayOfThings
    return [a, b]
  }
  useEffect(() => {
    if (isSmallScreen) setColumns(returnFirstAndLast(columns))
    if (!isSmallScreen) setColumns(initialColumns)
  }, [isSmallScreen, setColumns, initialColumns])
  return (
    <Box p={3} backgroundColor={'white'}>
      <Heading>Items ({data?.count})</Heading>
      <Flex>
        <Box>
          {feedItems?.q !== null && (
            <Button
              leftIcon={<MdKeyboardBackspace />}
              colorScheme="green"
              variant="solid"
              onClick={() => {
                setQuery('')
                setFuzzyQuery('')
                navigate(routes.home({}))
              }}
            >
              All feedItems
            </Button>
          )}
        </Box>
        <Spacer />
        <Button
          leftIcon={<MdAdd />}
          colorScheme="green"
          variant="solid"
          onClick={() => {
            navigate(routes.newFeedItem())
          }}
        >
          New feedItem
        </Button>
      </Flex>
      <TableQuery
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        rawQuery={feedItems?.q}
        inputPlaceholder="Search"
        link={(query) => {
          return routes.home({ q: query })
        }}
        setSkip={setSkip}
      />

      <Table variant="striped" colorScheme={'green'} size="xs">
        <TableCaption>List of Items</TableCaption>

        <TableColumns
          columns={columns}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setColumns={setColumns}
          initialColumns={initialColumns}
          setTake={setTake}
        />

        <TableRows
          columns={columns}
          roles={roles}
          setData={setData}
          data={data}
          model="feedItems"
          deleteMutation={DELETE_FEED_ITEM_MUTATION}
          displayColumn={displayColumn}
        />
      </Table>
      <Center>
        <TablePagination
          count={data.count}
          skip={skip}
          setSkip={setSkip}
          take={take}
        />
      </Center>
    </Box>
  )
}
