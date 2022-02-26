import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import { routes } from '@redwoodjs/router'
import { Fragment, useState } from 'react'
import PublicItemsCell from 'src/components/Items/PublicItemsCell'
import { showMatching, filterOut } from '/src/lib/atomicFunctions'
export const initialColumns = [
  {
    Header: 'Title',
    accessor: 'title',
    outSideLink: true,
    url: 'url',
    title: 'title',
    showMatching,
    filterOut,
    canRemove: false,
  },
  {
    Header: 'Date',
    accessor: 'createdAt',
    showMatching,
    filterOut,
    dataType: 'timestamp',
  },
  {
    Header: 'Source',
    accessor: '_feedTitle',
    canSort: false,
    //showMatching,
    //filterOut,
    dataType: 'integer',
    // If this is a reference
    // you may want to show a field
    // instead of the number here.
    // to do that remove type,
    // updated your query on the cell to include the model
    // update the accessor to a name not used by a column
    // and add;
    // canSort: false,
    // reference: true,
    // model: '_insertSingularModelHere_',
    // field: '_fieldFromModelHere_',
    // link: (givenId) => {
    //   // e.g. return routes._insertPluralModelHere_({ q: {"id": givenId}})
    //   // e.g. return routes.users({ q: `{"id": }` })// link to a list w/the query
    //   // e.g. return routes.user({ q: `{"id": }` })// link to the record
    // },
  },

  {
    Header: '⚙️',
    accessor: 'actions',
    canSort: false,
    canRemove: false,
    canReset: true,
    canExport: true,
    canSetTake: true,
  },
]

const Welcome = () => {
  let [orderBy, setOrderBy] = useState({ id: 'asc' }) // default order
  let [columns, setColumns] = useState(initialColumns) // default columns
  let [skip, setSkip] = useState(0) // default reocrds to jump
  let [take, setTake] = useState(10) // default records to take
  let [query, setQuery] = useState() // default query
  let [fuzzyQuery, setFuzzyQuery] = useState('') // default fuzzy query
  let roles = {
    createRecord: 'feeditemCreate',
    updateRecord: 'feeditemUpdate',
    deleteRecord: 'feeditemDelete',
  }

  return (
    <Fragment>
      <PublicItemsCell
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        columns={columns}
        setColumns={setColumns}
        initialColumns={initialColumns}
        take={take}
        setTake={setTake}
        skip={skip}
        setSkip={setSkip}
        query={query}
        setQuery={setQuery}
        fuzzyQuery={fuzzyQuery}
        setFuzzyQuery={setFuzzyQuery}
        displayColumn="id"
        roles={roles}
      />
    </Fragment>
  )
}

export default Welcome
