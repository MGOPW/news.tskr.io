import { Link, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import {
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
  const { hasRole /*currentUser*/ } = useAuth()
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
          <Box>
            <Badge m={2}>{row._feedTitle}</Badge>
            <a href={row[column.url]} target={'_blank'} rel="noreferrer">
              {row[column.title]}
            </a>
          </Box>
          <Box>
            {/*<Button as={Badge} backgroundColor={'blue'} size={'xs'}>
              Add
            </Button>*/}
            {row?._participants.map((person, index) => {
              return (
                <Box key={`${row}-person-${index}`}>
                  <Badge m={2}>{person.name}</Badge>
                </Box>
              )
            })}
          </Box>
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
                <>{new Date(row[column.accessor]).toLocaleString()} </>
              )}
              {column.dataType !== 'timestamp' && <>{row[column.accessor]}</>}
            </Link>
          </Box>
        </>
      )
    if (column.dataType === 'timestamp')
      return <Box p="2">{new Date(row[column.accessor]).toLocaleString()}</Box>
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
      if (hasRole([roles.deleteRecord].concat(['admin']))) {
        return (
          <Box p="2">
            <Button
              value={row.id}
              onClick={handleDeleteItem}
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              type="button"
              size="sm"
            >
              Remove
            </Button>
          </Box>
        )
      }
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
