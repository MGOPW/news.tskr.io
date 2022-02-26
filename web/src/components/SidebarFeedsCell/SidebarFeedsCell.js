import { Box } from '@chakra-ui/react'
import NavItem from '../NavItem/NavItem'
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
  //return JSON.stringify(feeds)
  return (
    <Box>
      <NavItem navigateTo={'home'}>All</NavItem>

      <Box overflow={'scroll'} height={'100vh'}>
        <ul>
          {feeds.results.map((feed) => {
            return (
              <NavItem
                pt={0}
                pb={0}
                size={'sm'}
                key={feed.id}
                navigateTo={'home'}
                query={{ q: `{"feedId":${feed.id}}` }}
              >
                {feed.title}
              </NavItem>
            )
          })}
        </ul>
      </Box>
    </Box>
  )
}
/**
 * const SidebarContent = ({ brand, onClose, ...rest }) => {
  const { hasRole } = useAuth()
  const LinkItems = [
    { name: 'Home', icon: MdHome, navigateTo: 'home' },
    { name: 'Users', icon: MdPerson, role: 'userRead', navigateTo: 'users' },
    { name: 'Groups', icon: MdGroups, role: 'groupRead', navigateTo: 'groups' },
    {
      name: 'Group Members',
      icon: MdPersonOutline,
      role: 'groupMemberRead',
      navigateTo: 'groupMembers',
    },
    {
      name: 'Group roles',
      icon: MdWork,
      role: 'groupRoleRead',
      navigateTo: 'groupRoles',
    },
    {
      name: 'Preferences',
      icon: MdRoomPreferences,
      roles: 'preferenceRead',
      navigateTo: 'preferences',
    },
    {
      name: 'Properties',
      icon: MdSettings,
      role: 'propertyRead',
      navigateTo: 'properties',
    },
    {
      name: 'Messages',
      icon: MdLanguage,
      role: 'messageRead',
      navigateTo: 'messages',
    },
    {
      name: 'Logs',
      icon: MdSettingsApplications,
      role: 'admin',
      navigateTo: 'logs',
    },
    { name: 'Logout', icon: MdLogout, navigateTo: 'logout' },
  ].filter((item) => {
    return hasRole(item.role) || hasRole('admin') || !item.role
  })

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {brand}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          navigateTo={link.navigateTo}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
 */
