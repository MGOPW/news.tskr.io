export const QUERY = gql`
  query SidebarFeedsQuery {
    sidebarFeeds {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sidebarFeeds }) => {
  return (
    <ul>
      {sidebarFeeds.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
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