import {
  MdOutlineArrowUpward,
  MdIosShare,
  MdTextSnippet,
  MdAudiotrack,
  MdVideoLibrary,
  MdPlusOne,
  MdAdd,
} from 'react-icons/md'
import { Link, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import {
  Icon,
  Button,
  Box,
  Flex,
  Tbody,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const TableRows = ({
  columns,
  roles,
  setData,
  data,
  deleteMutation,
  displayColumn,
  model,
}) => {
  const { hasRole, isAuthenticated } = useAuth()
  let handleUpClick = (event) => {
    if (isAuthenticated) {
      console.log('upvote to be implemented')
    }
  }
  let handleShareClick = (event) => {
    try {
      let item = JSON.parse(event.target.value)
      navigator?.share({
        title: item.title,
        text: `${item.title} from https://news.jace.pro`,
        url: item.url,
      })
    } catch (error) {
      console.log(error)
    }
  }
  let handleDeleteItem = (event) => {
    let id = parseInt(event.target.value, 10)
    let foundRow = data.results?.filter((user) => {
      return user.id === id
    })
    let question = `Are you sure you want to delete ${foundRow[0][displayColumn]}?`
    if (confirm(question)) {
      deleteRecord({ variables: { id } })
    }
  }

  const [deleteRecord] = useMutation(deleteMutation, {
    onError: (error) => {
      toast.error(error.message || `Error - not deleted`)
    },
    onCompleted: (del) => {
      toast.success(`Deleted ${del.deletedRow[displayColumn]}`)
      console.log(del)
      setData({
        ...data,
        results: data.results?.filter((row) => {
          return !(row.id === del.deletedRow.id)
        }),
        count: data.count - 1,
      })
    },
  })
  let menu = (row, column) => {
    let value = row[column.accessor]
    if (column.field) value = row[column.accessor][column.field]
    let rowActions = []
    if (column.showMatching)
      rowActions.push(
        <MenuItem
          key={'showMatching'}
          onClick={() => {
            navigate(column.showMatching(model, column, value))
          }}
        >
          Show Matching {column.Header}
        </MenuItem>
      )
    if (column.filterOut)
      rowActions.push(
        <MenuItem
          key={'filterOut'}
          onClick={() => {
            navigate(column.filterOut(model, column, value))
          }}
        >
          Filter Out {column.Header}
        </MenuItem>
      )
    if (column.copy)
      rowActions.push(
        <MenuItem
          key={'copy'}
          onClick={() => {
            column.copy(value)
          }}
        >
          Copy {value}
        </MenuItem>
      )
    if (rowActions.length > 0)
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            size="sm"
            marginLeft={1}
            marginTop={1}
            marginRight={1}
          />
          <MenuList>{rowActions}</MenuList>
        </Menu>
      )
    return <></>
  }
  let element = (row, column) => {
    let nestedElements = row[column?.accessor]?.length
    if (column.outSideLink) {
      return (
        <Box p="2">
          <Flex>
            {/*
            <Badge m={2}>
              {row?.feed?.feedIcon === 'Text' && <Icon as={MdTextSnippet} />}
              {row?.feed?.feedIcon === 'Audio' && <Icon as={MdAudiotrack} />}
              {row?.feed?.feedIcon === 'Video' && <Icon as={MdVideoLibrary} />}
              {row?.feed?.title}
            </Badge>*/}
            <a href={row[column.url]} target={'_blank'} rel="noreferrer">
              {row?.feed?.feedIcon === 'Text' && <Icon as={MdTextSnippet} />}
              {row?.feed?.feedIcon === 'Audio' && <Icon as={MdAudiotrack} />}
              {row?.feed?.feedIcon === 'Video' && <Icon as={MdVideoLibrary} />}
              {row[column.title]}
            </a>
          </Flex>
          <Flex gap={1} alignItems={'flex-end'}>
            {row?.FeedItemParticipant.map((FIP, index) => {
              //console.log(FIP)
              if (FIP.participant.active) {
                return (
                  <Box key={`${row}-person-${index}`}>
                    <Badge colorScheme={'blue'} ml={1} fontSize={'1em'}>
                      {FIP.participant.name}
                    </Badge>
                  </Box>
                )
              }
            })}
            {isAuthenticated && (
              <IconButton
                value={row.id}
                onClick={handleUpClick}
                icon={<MdAdd />}
                colorScheme="green"
                variant="solid"
                type="button"
                disabled={!isAuthenticated}
                size="xs"
              />
            )}
          </Flex>
        </Box>
      )
    }
    if (column.aggregate && column.link)
      return <Link to={column.link(row.id)}>{nestedElements}</Link>
    if (column.aggregate) return { nestedElements }
    if (column.reference && column.link) {
      return (
        <>
          {menu(row, column)}
          <Box p="2">
            <Link to={column.link(row[column.accessor].id)}>
              {row[column.accessor][column.field]}
            </Link>
          </Box>
        </>
      )
    }
    if (column.reference) {
      return (
        <>
          {menu(row, column)}
          <Box p="2">{row[column.accessor][column.field]}</Box>
        </>
      )
    }
    if (column.link)
      return (
        <>
          {menu(row, column)}
          <Box p="2">
            <Link title={row[column.accessor]} to={column.link(row.id)}>
              {column.dataType === 'timestamp' && (
                <Badge>
                  {new Date(row[column.accessor]).toLocaleString('en-CA')}{' '}
                </Badge>
              )}
              {column.dataType !== 'timestamp' && <>{row[column.accessor]}</>}
            </Link>
          </Box>
        </>
      )
    if (column.dataType === 'timestamp')
      return (
        <Badge colorScheme={'red'}>
          {new Date(row[column.accessor]).toLocaleString()}
        </Badge>
      )
    if (column.dataType === 'boolean') {
      let bool = 'false'
      if (row[column.accessor] === true) bool = 'true'
      return <Box p="2">{bool}</Box>
    }
    if (row?.[column.accessor])
      return (
        <>
          {menu(row, column)}
          <Box p="2">{row[column.accessor].toString()}</Box>
        </>
      )
    if (column.accessor === 'actions') {
      let UpButton = (
        <>
          {column?.canUpVote && (
            <SimpleGrid columns={1} gap={1}>
              <IconButton
                value={row.id}
                onClick={handleUpClick}
                icon={<MdPlusOne />}
                colorScheme="green"
                variant="solid"
                type="button"
                size="md"
              />
              <Badge colorScheme={'grey'} textAlign={'center'}>
                {JSON.stringify(row?._count?.UpVote)}
              </Badge>
            </SimpleGrid>
          )}
        </>
      )
      let ShareReportButtons = (
        <>
          <SimpleGrid columns={1} gap={1}>
            {column?.canShare && (
              <IconButton
                aria-label="Share"
                value={JSON.stringify(row)}
                onClick={handleShareClick}
                icon={<MdIosShare />}
                colorScheme="blue"
                variant="solid"
                type="button"
                size="md"
              />
            )}
            {column?.canReport && (
              <Button
                size={'xs'}
                as={Badge}
                colorScheme={'yellow'}
                textAlign={'center'}
              >
                Report
              </Button>
            )}
          </SimpleGrid>
        </>
      )
      let DeleteButton = (
        <>
          <SimpleGrid columns={1} gap={1}>
            {hasRole([roles.deleteRecord].concat(['admin'])) && (
              <Button
                value={row.id}
                onClick={handleDeleteItem}
                leftIcon={<CloseIcon />}
                colorScheme="red"
                variant="solid"
                type="button"
                size="md"
              >
                Remove
              </Button>
            )}
            {column?.canReport && (
              <Button
                size={'xs'}
                as={Badge}
                colorScheme={'yellow'}
                textAlign={'center'}
              >
                Report
              </Button>
            )}
          </SimpleGrid>
        </>
      )
      return (
        <Box p="2">
          <Flex gap={1}>
            {UpButton}
            {ShareReportButtons}
            {DeleteButton}
          </Flex>
        </Box>
      )
    }
  }

  return (
    <Tbody>
      {data.results?.map((row) => {
        return (
          <tr className={`${row.id}_row`} key={row.id}>
            {columns.map((column) => {
              return (
                <Td key={`${row.id}_${column.accessor}`}>
                  <Flex>{element(row, column)}</Flex>
                </Td>
              )
            })}
          </tr>
        )
      })}
    </Tbody>
  )
}

export default TableRows
